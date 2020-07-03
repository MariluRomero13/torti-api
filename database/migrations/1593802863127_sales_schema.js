'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalesSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.bigIncrements()
      table.bigInteger('assignments_customers_id').unsigned().references('id').
      inTable('assignments_customers')
      table.decimal('total', 10, 2).notNullable()
      table.decimal('credit', 10, 2)
      table.decimal('total_to_pay', 10, 2)
      table.boolean('status').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SalesSchema
