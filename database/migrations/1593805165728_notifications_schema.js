'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationsSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.bigIncrements()
      table.bigInteger('user_id').unsigned().references('id').inTable('users')
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationsSchema
