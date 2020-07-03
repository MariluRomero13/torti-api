'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LostProductsSchema extends Schema {
  up () {
    this.create('lost_products', (table) => {
      table.bigIncrements()
      table.bigInteger('sale_id').unsigned().references('id').inTable('sales')
      table.bigInteger('product_id').unsigned().references('id').inTable('products')
      table.integer('quantity')
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('lost_products')
  }
}

module.exports = LostProductsSchema
