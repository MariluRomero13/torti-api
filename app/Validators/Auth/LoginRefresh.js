'use strict'

class LoginRefresh {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      refresh_token: 'required'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = LoginRefresh
