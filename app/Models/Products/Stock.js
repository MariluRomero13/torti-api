'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Stock extends Model {

    assignmentProduct() {
        return this.hasOne('App/Models/Products/AssignmentProduct')
    }

    product() {
        return this.belongsTo('App/Models/Products/Product', 'product_id', 'id')
    }

    static get store() {
        return [
          'product_id',
          'initial_stock',
          'actual_stock'
        ]
      }
    
      static get update() {
        return this.store
      }
}

module.exports = Stock
