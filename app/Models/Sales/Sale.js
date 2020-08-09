'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {

    details() {
      return this.hasMany('App/Models/Sales/SaleDetail')
    }

    lost_products() {
      return this.hasMany('App/Models/Products/LostProduct')
    }

    assignment() {
      return this.belongsTo('App/Models/Customers/AssignmentCustomerDetail', 'assignments_customers_details_id')
    }


    static get status(){
        return {
            completed: 1,
            pending: 2,
            pendingCompleted: 3
        }
    }
}

module.exports = Sale
