'use strict'
const Employee = use('App/Models/Employees/Employee')
const moment = use('moment')


class AssignmentCustomerController {
    async index ({ request, response, auth }) {
        const today = moment().format('YYYY-MM-DD')
        const user = await auth.getUser()
        const assignCustomer =  await user.employee()
            .with('assignCustomer', builder => {
                builder.whereHas('details', builder => {
                    builder.where({ status: 0 , delivery_date: today})
                } ,1)
                .with('customers')
            })
            .fetch() 
            
        return response.ok(assignCustomer)
    }
}

module.exports = AssignmentCustomerController
