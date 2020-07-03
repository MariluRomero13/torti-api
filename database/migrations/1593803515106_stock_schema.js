'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StockSchema extends Schema {
  up () {
    this.create('stocks', (table) => {
      table.bigIncrements()
      table.bigInteger('product_id').unsigned().references('id').inTable('products')
      table.integer('initial_stock')
      table.integer('actual_stock')
      table.timestamps()
    })
  }

  down () {
    this.drop('stocks')
  }
}

module.exports = StockSchema
