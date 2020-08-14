'use strict'

/*
|--------------------------------------------------------------------------
| AssignProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { assingmentsProducts } = use('./data.json')

class AssignProductSeeder {
  async run () {
  }

  static async _run() {
    for (const assingProduct of assingmentsProducts) {
      await Factory.model('App/Models/Products/AssignmentProduct').create(assingProduct)
    }
  }
}

module.exports = AssignProductSeeder
