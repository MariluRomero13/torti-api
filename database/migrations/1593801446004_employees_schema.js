'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeesSchema extends Schema {
  up () {
    this.create('employees', (table) => {
      table.bigIncrements()
      table.bigInteger('user_id').unsigned().references('id').inTable('users')
      table.integer('role_id').unsigned().notNullable().references('id').inTable('roles')
      table.string('name', 80).notNullable()
      table.string('paternal', 80).notNullable()
      table.string('maternal', 80)
      table.string('phone', 15)
      table.text('address')
      table.boolean("is_active").notNullable().defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('employees')
  }
}

module.exports = EmployeesSchema
