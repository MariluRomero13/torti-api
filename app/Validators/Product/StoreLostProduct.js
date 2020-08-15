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
      sale_id: 'required|integer|exists:sales,id', 
      product_id: 'required|integer|exists:products,id',
      quantity: 'required|integer',
      description: 'required'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = ProductStoreLostProduct
