'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AssignmentsCustomersSchema extends Schema {
  up () {
    this.create('assignments_customers', (table) => {
      table.bigIncrements()
      table.bigInteger('customer_id').unsigned().references('id').inTable('customers')
      table.bigInteger('employee_id').unsigned().references('id').inTable('employees')
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('assignments_customers')
  }
}

module.exports = AssignmentsCustomersSchema
