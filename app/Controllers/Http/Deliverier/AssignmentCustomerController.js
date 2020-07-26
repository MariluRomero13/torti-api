'use strict'
const Employee = use('App/Models/Employees/Employee')

class AssignmentCustomerController {
    async index ({ request, response, auth }) {
        const user = await auth.getUser()
        const assignCustomer =  await user.employee()
            .with('assignCustomer', builder => {
                builder.where("is_active", true)
                    .with('customers')
            }).fetch() 
            
        return response.ok(assignCustomer)
    }
}

module.exports = AssignmentCustomerController
