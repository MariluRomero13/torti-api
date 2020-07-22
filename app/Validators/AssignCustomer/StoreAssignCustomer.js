'use strict'
const { formatters } = use('Validator')

class StoreAssignCustomer {
  get formatter() {
    return formatters.JsonApi
  }

  get validateAll() {
    return true
  }

  get rules() {
    return {
      employee_id: 'required',
      customers: 'required',
    }
  }
}

module.exports = StoreAssignCustomer
