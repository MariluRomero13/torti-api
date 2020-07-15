'use strict'

class DashboardController {
  welcome ({ response }) {
    return response.ok({ status: 'Esta es la api.' })
  }
}

module.exports = DashboardController
