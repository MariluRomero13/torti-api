'use strict'
const AssignmentCustomer = use('App/Models/Customers/AssignmentCustomer')
const Database = use('Database')
const Sale = use('App/Models/Sales/Sale')
const Product = use('App/Models/Products/Product')
const moment = use('moment')

class SaleController {
    async store ({ request, response, auth }) {
        const { total, payment } = request.all()
        const details = request.input('details')

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

        const saleTotal = details.reduce((total, item) => total + item.total, 0)
        if (total !== saleTotal || payment > saleTotal) {
            return response.conflict({
                status: false,
                message: "There are a conflict in sales"
            })
        }

        const totalToPay = saleTotal - payment
        const assignment = await AssignmentCustomer.query()
            .where({ customer_id: request.input('customer_id'), employee_id: auth.user.id })
            .first()
        let status
        if(totalToPay === 0) {
            status = Sale.status.completed
        } else if (totalToPay > 0) {
            status = Sale.status.pending
        }

        const trx = await Database.beginTransaction()
        const saleData = {
            assignments_customers_id: assignment.id,
            total,
            credit: payment,
            total_to_pay: totalToPay,
            status
        }

        try {
            const sale = await Sale.create(saleData, trx)
            await sale.details().createMany(details, trx)
            await trx.commit()
            return response.ok({
                status: true,
                message: "Sale created succesfully"
            })
        } catch(err) {
            await trx.rollback()
            console.log(err)
            return response.badRequest()
        }
        
    }


    async getSalesHistory({ request, response, auth }) {
        try{
        const status = request.input('status')
        const sales = await AssignmentCustomer.query()
            .where({ customer_id: request.input('customer_id'), employee_id: auth.user.id })
            .with('details', builder => {
                builder.where({ status })
                .with('sale.details.product')
            })
            .first()
        return response.ok(sales)
        } catch (error) {
            console.log(error);
            return response.badRequest()
        }
        
    }


}

module.exports = SaleController
