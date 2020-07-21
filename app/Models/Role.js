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

  employee () {
    return this.belongsTo('App/Models/Employees/Employee', 'role_id', 'id')
  }

}

module.exports = Role
