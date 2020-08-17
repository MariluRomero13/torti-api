'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AssignmentProduct extends Model {

    employee() {
        return this.belongsTo('App/Models/Employees/Employee')
    }

    stock() {
        return this.belongsTo('App/Models/Products/Stock')
    }

    static get table() {
        return "assingments_products"

    }

    static get store(){
        return ['employee_id','quantity','stock_id']
    }

    static get update(){
        return ['quantity','stock_id']
    }
}

module.exports = AssignmentProduct
