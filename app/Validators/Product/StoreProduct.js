'use strict'
const { formatters } = use('Validator')

class StoreProduct {
  get formatter() {
    return formatters.JsonApi
  }

  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: 'required',
      unit_price: 'required',
    }
  }
}

module.exports = StoreProduct
