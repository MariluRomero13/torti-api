'use strict'

/*
|--------------------------------------------------------------------------
| AssignCustomerDetailSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { assignCustomersDetails } = use('./data.json')
class AssignCustomerDetailSeeder {
  async run () {
  }

  static async _run() {
    for (const assignCustomer of assignCustomersDetails) {
      await Factory.model('App/Models/Customers/AssignmentCustomerDetail').create(assignCustomer)
    }
  }
}

module.exports = AssignCustomerDetailSeeder
