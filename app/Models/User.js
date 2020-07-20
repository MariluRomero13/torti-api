'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get hidden () {
    return ['password']
  }

  static get changePassword () {
    return [
      'user',
      'password',
      'newPassword'
    ]
  }

  static get store() {
    return [
      'username',
      'email',
      'password'
    ]
  }

  static get update() {
    return this.store
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  employee () {
    return this.hasOne('App/Models/Employees/Employee', 'id', 'user_id')
  }

}

module.exports = User
