'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.bigIncrements()
      table.string('name', 100)
      table.decimal('unit_price',10, 2).notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
