'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Employee extends Model {

  user() {
    return this.belongsTo('App/Models/User', 'user_id')
  }

  role() {
    return this.belongsTo('App/Models/Role', 'role_id')
  }

  assignCustomer () {
    return this.hasMany('App/Models/Customers/AssignmentCustomer', 'id', 'employee_id')
  }

  static get store() {
    return [
      'role_id',
      'name',
      'paternal',
      'maternal',
      'phone',
      'address'
    ]
  }

  static get update() {
    return this.store
  }
}

module.exports = Employee
