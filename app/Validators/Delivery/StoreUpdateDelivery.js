'use strict'
const { formatters } = use('Validator')

class StoreUpdateDelivery {
  get formatter() {
    return formatters.JsonApi
  }

  get validateAll() {
    return true
  }

  get rules () {
    return {
      assignments_customers_id:'required',
      delivery_date:'required'
    }
  }
}

module.exports = StoreUpdateDelivery
