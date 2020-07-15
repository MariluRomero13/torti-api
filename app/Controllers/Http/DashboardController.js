'use strict'
const Database = use('Database')
class DashboardController {
  welcome ({ response }) {
    return response.ok({ status: 'Esta es la api.' })
  }

  async index({ response }) {
    const employees = await Database.from('employees').where('role_id', 2).getCount()
    const customers = await Database.from('customers').getCount()
    const sales = await Database.from('sales').getCount()
    return response.ok({ employees, customers, sales });
  }
}

module.exports = DashboardController
