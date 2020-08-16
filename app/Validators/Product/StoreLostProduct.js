'use strict'
const { formatters } = use('Validator')

class ProductStoreLostProduct {

  get formatter() {
    return formatters.JsonApi
  }

  get validateAll() {
    return true
  }

  get rules () {
    return {
      customer_id: 'required|integer|exists:customers,id',
      details: 'required|array',
      'details.*.product_id': 'required|integer|exists:products,id',
      'details.*.quantity': 'required|integer',
      'details.*.description': 'required'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = ProductStoreLostProduct
