'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

  stock() {
    return this.hasOne('App/Models/Products/Stock')
  }

  sale_details() {
    return this.hasMany('App/Models/Sale/SaleDetail')
  }

  lost_products() {
    return this.hasMany('App/Models/Products/LostProduct')
  }

  static get store() {
    return [
      'name',
      'unit_price'
    ]
  }

  static get update() {
    return this.store
  }
}

module.exports = Product
