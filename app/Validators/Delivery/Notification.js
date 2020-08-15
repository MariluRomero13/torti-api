'use strict'
const { formatters } = use('Validator')
class DeliveryNotification {
  get formatter () {
    return formatters.jsonApi
  }

  get validateAll(){
    return true
  }

  get rules () {
    return {
      description: 'required'
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = DeliveryNotification
