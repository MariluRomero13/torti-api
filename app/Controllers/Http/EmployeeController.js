'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Employee = use('App/Models/Employees/Employee')
const User = use('App/Models/User')
class EmployeeController {

  async index ({ response }) {
    const employees = await Employee.all()
    return response.ok(employees)
  }

  async store ({ request, response }) {
    const employeeData = request.only(Employee.store)
    const userData = request.only(User.store)
    let userCreated;
    if (userData.username && userData.email && userData.password) {
      userCreated = await this.createUserAccount(userData)
    }
    const employee = await Employee.create(employeeData)
    employee.user_id = userCreated
    employee.save()
    return response.ok({
      status: true,
      message: 'Employee created successfully',
      data: employee
    })
  }

  async show ({ params, response }) {
    const employee = await Employee.query().with('user').with('role')
                                    .where('id', params.id).fetch()
    return response.ok(employee)
  }

  async update ({ params, request, response }) {
    const employeeData = request.only(Employee.update)
    const userData = request.only(User.update)
    const employee = await Employee.find(params.id)
    let userCreated;
    if (userData.username && userData.email && userData.password) {
      if (!employee.user_id) {
        userCreated = await this.createUserAccount(userData)
      } else {
        await this.updateUserAccount(userData, employee)
      }
    }
    employee.merge(employeeData)
    employee.user_id = userCreated
    await employee.save()

    return response.ok({
      status: true,
      message: 'Employee updated successfully',
      data: employee
    })
  }

  async destroy ({ params, response }) {
    const employee = await Employee.find(params.id)
    employee.is_active = !employee.is_active
    await employee.save()
    return response.ok({
      success: true,
      message: 'Employee status was changed'
    });
  }

  async createUserAccount(userData) {
    const user = await User.create(userData)
    return user.id
  }

  async updateUserAccount(userData, employee) {
    const user = await User.find(employee.user_id)
    user.merge(userData)
    await user.save()
    return user.id
  }
}

module.exports = EmployeeController
