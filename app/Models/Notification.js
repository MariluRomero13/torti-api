'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Notification extends Model {
  users() {
    return this.belongsTo('App/Models/User', 'user_id')
  }
}

module.exports = Notification
