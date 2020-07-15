'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Role extends Model {
  static get createdAtColumn () {
    return null;
  }

  static get updatedAtColumn () {
    return null;
  }

  user () {
    return this.belongsTo('App/Models/Role', 'role_id', 'id')
  }

}

module.exports = Role
