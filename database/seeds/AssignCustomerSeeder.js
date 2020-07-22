'use strict'

/*
|--------------------------------------------------------------------------
| AssignCustomerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { assignCustomers } = use('./data.json')
class AssignCustomerSeeder {
  async run () {
  }

  static async _run() {
    for (const assignCustomer of assignCustomers) {
      await Factory.model('App/Models/Customers/AssignCustomer').create(assignCustomer)
    }
  }
}

module.exports = AssignCustomerSeeder
