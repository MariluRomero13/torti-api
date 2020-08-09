'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Employee = use('App/Models/Employees/Employee')
const Customer = use('App/Models/Customers/Customer')
const AssignCustomer = use('App/Models/Customers/AssignmentCustomer')
class AssignCustomerController {

  async index ({ response }) {
    const employees = await Employee
    .query()
    .where('role_id', 2)
    .withCount('assignCustomer as customers')
    .fetch()

    return response.ok(employees.toJSON())
  }

  async store ({ request, response }) {
    const customers = request.input('customers')
    const employee = await Employee.find(request.input('employee_id'))
    for (let index = 0; index < customers.length; index++) {
      const assignCustomer = new AssignCustomer()
      assignCustomer.employee_id = employee.id
      assignCustomer.customer_id = customers[index]
      await assignCustomer.save()
    }

    return response.ok({
      success: true,
      message: 'Assignment created successfully',
      data: ''
    })
  }

  async show ({ params, response }) {
    const employee = await Employee.query().with('assignCustomer').with('assignCustomer.customers')
                      .where('id', params.id).fetch()
    return response.ok(employee)
  }

  async update ({ params, request, response }) {
    await AssignCustomer.query().where('employee_id', params.id).delete()
    return await this.store({ request, response })
  }

  async destroy ({ params, response }) {
    const assignment = await AssignCustomer.find(params.id)
    assignment.is_active = !assignment.is_active
    await assignment.save()
    return response.ok({
      status: true,
      message: 'Assignment deleted successfully',
      data: {}
    })
  }

  async getUnassignedCustomers({ response }) {
    const customers = await Customer.query().whereDoesntHave('assignCustomer').where('is_active', 1).fetch()
    return response.ok(customers)
  }
}

module.exports = AssignCustomerController
