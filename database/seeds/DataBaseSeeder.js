'use strict'


const RoleSeeder = require('./RoleSeeder')
const UserSeeder = require('./UserSeeder')
const EmployeeSeeder = require('./EmployeeSeeder')
const ProductSeeder = require('./ProductSeeder')
class DataBaseSeeder {
  async run () {
    await RoleSeeder._run()
    await UserSeeder._run()
    await EmployeeSeeder._run()
    await ProductSeeder._run()
  }
}

module.exports = DataBaseSeeder
