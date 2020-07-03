'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AssingmentsCustomersDetailsSchema extends Schema {
  up () {
    this.create('assingments_customers_details', (table) => {
      table.bigIncrements()
      table.bigInteger('assignments_customers_id').unsigned().references('id').inTable('assignments_customers')
      table.date('delivery_date')
      table.boolean('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('assingments_customers_details')
  }
}

module.exports = AssingmentsCustomersDetailsSchema
