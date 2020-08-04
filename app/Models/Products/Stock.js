'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Stock extends Model {

    assignmentProduct() {
        return this.hasOne('App/Models/Products/AssignmentProduct')
    }

    product() {
        return this.belongsTo('App/Models/Products/Product')
    }
}

module.exports = Stock
