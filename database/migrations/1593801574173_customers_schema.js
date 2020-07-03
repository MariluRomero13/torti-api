'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomersSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.bigIncrements()
      table.string('name', 100)
      table.string('phone', 15)
      table.text('address')
      table.decimal('latitude',10,7).notNullable()
      table.decimal('longitude', 10, 7).notNullable()
      table.boolean('is_active').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomersSchema
