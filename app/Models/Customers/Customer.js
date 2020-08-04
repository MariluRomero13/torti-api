'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {

  static get store(){
    return [
      'name',
      'phone',
      'address',
      'latitude',
      'longitude'
    ]
  }

  static get update(){
    return this.store
  }

  assignCustomer () {
    return this.hasMany('App/Models/Customers/AssignmentCustomer', 'id', 'customer_id')
  }
}

module.exports = Customer
