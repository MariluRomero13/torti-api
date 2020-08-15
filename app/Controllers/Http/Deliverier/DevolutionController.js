'use strict'
const LostProduct = use('App/Models/Products/LostProduct')
const moment = use('moment')
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

    async store ({ request, response }) {
        const data = request.only(LostProduct.store)
        await LostProduct.create(data)
        return response.ok({
            status: true,
            message: "devolution was created successfully"
        })
    }
}

module.exports = DevolutionController
