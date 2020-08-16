'use strict'
const LostProduct = use('App/Models/Products/LostProduct')
const Sale = use('App/Models/Sales/Sale')
const AssignmentDetail = use('App/Models/Customers/AssignmentCustomerDetail')
const moment = use('moment')
const Database = use('Database')
class DevolutionController {
    async index ({ params, request, response, auth }) {
        const now = moment()
        const today = now.format()
        const monthAgo = now.subtract(1, 'months').format()
        const devolutions = await LostProduct.query()
            .whereHas('sale', builder => {
                builder.whereHas('assignment', builder => {
                    builder.whereHas('assignment', builder => { 
                        builder.where({ customer_id: params.id, employee_id: auth.user.id })
                    })
                })
            })
            .whereBetween('created_at', [monthAgo, today])
            .with('product')
            .fetch()
            
        return response.ok(devolutions)
    }

    async store ({ request, response, auth }) {
        const assignmentDetail = await AssignmentDetail.query()
            .whereHas('assignment', builder => {
                builder.where(
                { 
                    customer_id: request.input('customer_id'), 
                    employee_id: auth.user.id
                })
            })
            .first()
        const trx = await Database.beginTransaction()
        const details = request.input('details')
        try {
            const saleData = {
                assignments_customers_details_id: assignmentDetail.id,
                total: 0,
                credit: 0,
                total_to_pay: 0,
                status: 4
            }
            const sale = await Sale.create(saleData, trx)
            await sale.lost_products().createMany(details, trx)
            await trx.commit()
            return response.ok({
                status: true,
                message: "devolution was created successfully"
            })
        } catch (error) {
            await trx.rollback()
            console.log(error);
            return response.badRequest()
        }
    }
}

module.exports = DevolutionController
