'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Employee extends Model {

    user() {
        return this.belongsTo('App/Models/User', 'user_id')
    }

    role() {
        return this.belongsTo('App/Models/Role', 'role_id')
    }
}

module.exports = Employee
