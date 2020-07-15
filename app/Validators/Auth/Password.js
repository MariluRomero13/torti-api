'use strict'

class Password {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      user: 'required',
      password: 'required',
      newPassword: 'required'
    }
  }
}

module.exports = Password
