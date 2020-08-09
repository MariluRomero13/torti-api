'use strict'

/*
|--------------------------------------------------------------------------
| SaleDetailSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { sale_details } = use('./data.json')
class SaleDetailSeeder {
  async run () {
  }

  static async _run() {
    for (const saleDetail of sale_details) {
      await Factory.model('App/Models/Sales/SaleDetail').create(saleDetail)
    }
  }
}

module.exports = SaleDetailSeeder
