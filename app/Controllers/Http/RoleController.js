'use strict'

const Role = use('App/Models/Role')
class RoleController {
  async index({ response }) {
    const roles = await Role.all()
    return response.ok(roles)
  }
}

module.exports = RoleController
