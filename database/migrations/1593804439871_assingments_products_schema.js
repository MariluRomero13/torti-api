'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AssingmentsProductsSchema extends Schema {
  up () {
    this.create('assingments_products', (table) => {
      table.bigIncrements()
      table.bigInteger('employee_id').unsigned().references('id').inTable('employees')
      table.integer('quantity').notNullable()
      table.bigInteger('stock_id').unsigned().references('id').inTable('stocks')
      table.timestamps()
    })
  }

  down () {
    this.drop('assingments_products')
  }
}

module.exports = AssingmentsProductsSchema
