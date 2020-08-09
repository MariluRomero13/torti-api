'use strict'

/*
|--------------------------------------------------------------------------
| LostProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { lost_products } = use('./data.json')
class LostProductSeeder {
  async run () {
  }

  static async _run() {
    for (const product of lost_products) {
      await Factory.model('App/Models/Products/LostProduct').create(product)
    }
  }
}

module.exports = LostProductSeeder
