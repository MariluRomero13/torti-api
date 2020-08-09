'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AssignmentCustomerDetail extends Model {
  static get table () {
    return 'assingments_customers_details'
  }

  assignment() {
    return this.belongsTo('App/Models/Customers/AssignmentCustomer', 'assignments_customers_id', 'id')
  }

  sale () {
    return this.hasMany('App/Models/Sales/Sale', 'id', 'assignments_customers_details_id')
  }

  static get store() {
    return [
      'assignments_customers_id',
      'delivery_date',
    ]
  }

  static get update() {
    return this.store
  }
}

module.exports = AssignmentCustomerDetail
