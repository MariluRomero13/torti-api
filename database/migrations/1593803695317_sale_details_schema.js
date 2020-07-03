'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaleDetailsSchema extends Schema {
  up () {
    this.create('sale_details', (table) => {
      table.bigIncrements()
      table.bigInteger('sale_id').unsigned().references('id').inTable('sales')
      table.bigInteger('product_id').unsigned().references('id').inTable('products')
      table.integer('quantity').notNullable()
      table.decimal('total', 10, 2)
      table.timestamps()
    })
  }

  down () {
    this.drop('sale_details')
  }
}

module.exports = SaleDetailsSchema
