'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LostProduct extends Model {
  sale() {
    return this.belongsTo('App/Models/Sales/Sale', 'sale_id', 'id')
  }

  product() {
    return this.belongsTo('App/Models/Products/Product', 'product_id', 'id')
  }
}

module.exports = LostProduct
