'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AssignmentCustomer extends Model {

  static get table () {
    return 'assignments_customers'
  }

  static get store() {
    return [
      'employee_id',
      'customer_id'
    ]
  }

  employees() {
    return this.belongsTo('App/Models/Employees/Employee', 'employee_id')
  }

  customers() {
    return this.belongsTo('App/Models/Customers/Customer', 'customer_id')
  }


}

module.exports = AssignmentCustomer
