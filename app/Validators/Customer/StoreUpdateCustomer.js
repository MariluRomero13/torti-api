'use strict'
const { formatters } = use('Validator')

class StoreUpdateCustomer {
  get formatter() {
    return formatters.JsonApi
  }

  get validateAll() {
    return true
  }

  get rules () {
    return {
      name:'required',
      phone:'required',
      address:'required',
      latitude:'required',
      longitude:'required'
    }
  }
}

module.exports = StoreUpdateCustomer
