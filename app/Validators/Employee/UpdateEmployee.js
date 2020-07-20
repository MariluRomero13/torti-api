'use strict'
const { formatters } = use('Validator')

class UpdateEmployee {
  get formatter() {
    return formatters.JsonApi
  }

  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: 'required',
      paternal: 'required',
      maternal: 'required',
      role_id: 'required|integer',
      phone: 'required|max:10',
      address: 'required'
    }
  }
}

module.exports = UpdateEmployee
