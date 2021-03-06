'use strict'
const AssignmentCustomer = use('App/Models/Customers/AssignmentCustomer')
const Database = use('Database')
const Sale = use('App/Models/Sales/Sale')
const SaleDetail = use('App/Models/Sales/SaleDetail')
const Product = use('App/Models/Products/Product')
const AssignmentDetail = use('App/Models/Customers/AssignmentCustomerDetail')
const moment = use('moment')

class SaleController {
    async store ({ request, response, auth }) {
        const { total, payment, customer_id } = request.all()
        console.log(customer_id)
        const details = request.input('details')
        const user = await auth.getUser()
        const employee = await user.employee().first()

    
        for (const detail of details) {
            const product = await Product.find(detail.product_id)
            const stock = await product.stock()
                .select('actual_stock').first()
            const quantity = detail.quantity
            if (stock === null || quantity > stock.actual_stock) {
                return response.conflict({
                    status: false,
                    message: "There are insufficient products"
                })
            }
            detail.total = parseFloat(product.unit_price * quantity)
        }
    
        const saleTotal = details.reduce((total, item) => total + +item.total, 0)
        console.log(saleTotal)
        if (+total !== saleTotal || +payment > saleTotal) {
            return response.conflict({
                status: false,
                message: "There are a conflict in sales"
            })
        }
        
        console.log("id" + customer_id);
        const totalToPay = saleTotal - payment
        const today = moment().format('YYYY-MM-DD')
        const assignmentDetail = await AssignmentDetail.query()
            .where({ delivery_date: today })
            .whereHas('assignment', builder => {
                builder.where(
                { 
                    customer_id, 
                    employee_id: employee.id
                })
            })
            .first()
        let status  
        if(totalToPay === 0) {
            status = Sale.status.completed
        } else if (totalToPay > 0) {
            status = Sale.status.pending
        }
        
        const pendingPayments =  await Sale.query()
            .where('status', 2)
            .whereHas('assignment.assignment', builder => {
                builder.where({ customer_id: customer_id })
            }).first()
    
        if (pendingPayments && status === 2) {
                const sale = await Sale.find(pendingPayments.id)
                sale.total = sale.total + parseFloat(total)
                sale.credit = sale.credit + parseFloat(payment)
                sale.total_to_pay = sale.total - sale.credit
                await sale.save()
    
                await sale.details().createMany(details)
                assignmentDetail.status = 1
                await assignmentDetail.save()
                return response.ok({
                    status: true,
                    message: "Pending payment was succesfully"
                })
        } else {
            const saleData = {
                assignments_customers_details_id: assignmentDetail.id,
                total,
                credit: payment,
                total_to_pay: totalToPay,
                status
            }
    
            const sale = await Sale.create(saleData)
            await sale.details().createMany(details)
            assignmentDetail.status = 1
            await assignmentDetail.save()
            return response.ok({
                status: true,
                message: "Sale was succesfully"
            })
        }       
    }


    async getSalesHistory ({ request, response, auth }) {
        try{
        const now = moment()
        const today = now.format()
        const monthAgo = now.subtract(1, 'months').format()
        const status = request.input('status')
    
        const assignment = await AssignmentCustomer.query()
            .where({ customer_id: request.input('customer_id'), employee_id: auth.user.id })
            .first()
        let arrayStatus = []
        if(status == 1) {
            arrayStatus = [1,3]
        } else {
            arrayStatus = [2]
        }
        const sales = await Sale.query()
            .whereBetween('created_at', [ monthAgo, today ])
            .whereIn('status', arrayStatus)
            .whereHas('assignment', builder => {
                builder.where({ assignments_customers_id: assignment.id })
            })
            .with('details.product')
            .fetch()

        return response.ok(sales)
        } catch (error) {
            console.log(error);
            return response.badRequest()
        }
        
    }

    async getPendingProducts ({ response, params }) {
        const products = await Database.table('sales as s')
            .innerJoin('sale_details as sd', 'sd.sale_id', 's.id')
            .innerJoin('products as p', 'sd.product_id', 'p.id')
            .innerJoin('assingments_customers_details as acd', 's.assignments_customers_details_id', 'acd.id')
            .innerJoin('assignments_customers as ac', 'acd.assignments_customers_id', 'ac.id')
            .select('sd.quantity', 'p.name', 'sd.total as total_product', 's.credit', 's.total_to_pay', 's.total')
            .where('s.status', 2)
            .where('ac.customer_id', params.id)

        return response.ok({products})
    }

    async liquidateSale ({ request, response }) {
        const { customer_id, payment } = request.all()
        const pendingPayments =  await Sale.query()
            .where('status', 2)
            .whereHas('assignment.assignment', builder => {
                builder.where({ customer_id: customer_id })
            }).first()

        if (pendingPayments) {
            if (payment > pendingPayments.total_to_pay) {
                return response.conflict({
                    status: false,
                    message: "There are a conflict in sales"
                }) 
            } 
            const sale = await Sale.find(pendingPayments.id)
            sale.credit = sale.credit + parseFloat(payment)
            sale.total_to_pay = sale.total - sale.credit
            await sale.save()

            if (sale.total_to_pay === 0) {
                sale.status = 3
                sale.save()

                return response.ok({
                    status: true,
                    message: "The payment has been finished"
                })
            }

            return response.ok({
                status: true,
                message: "The payment has been made"
            })    
        }  
    }

}

module.exports = SaleController
