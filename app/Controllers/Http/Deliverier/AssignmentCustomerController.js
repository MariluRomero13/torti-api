'use strict'
const moment = use('moment')


class AssignmentCustomerController {
    async index ({ request, response, auth }) {
        const today = moment().format('YYYY-MM-DD')
        const user = await auth.getUser()
        const condition = { delivery_date: today }
        if (request.method() === 'GET') {
            condition.status = 0
        }
        
        const assignCustomer =  await user.employee()
            .with('assignCustomer', builder => {
                builder.whereHas('details', builder => {
                    builder.where( condition )
                }, 1)
                .with('customers')
            })
            .fetch() 
            
        return response.ok(assignCustomer)
    }
}

module.exports = AssignmentCustomerController
