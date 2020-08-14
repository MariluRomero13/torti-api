'use strict'

/*
|--------------------------------------------------------------------------
| StockSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { stocks } = use('./data.json')

class StockSeeder {
  async run () {
  }

  static async _run() {
    for (const stock of stocks) {
      await Factory.model('App/Models/Products/Stock').create(stock)
    }
  }
}

module.exports = StockSeeder
