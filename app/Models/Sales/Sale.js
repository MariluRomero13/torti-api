'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {

    details() {
        return this.hasMany('App/Models/Sales/SaleDetail')
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
