'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

  stock() {
    return this.hasOne('App/Models/Products/Stock')
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
