'use strict'


const RoleSeeder = require('./RoleSeeder')
const UserSeeder = require('./UserSeeder')
const EmployeeSeeder = require('./EmployeeSeeder')
const ProductSeeder = require('./ProductSeeder')
const CustomerSeeder = require('./CustomerSeeder')
const AssignCustomerSeeder = require('./AssignCustomerSeeder')
const AssignCustomerDetailSeeder = require('./AssignCustomerDetailSeeder')
const SaleSeeder = require('./SaleSeeder')
const SaleDetailSeeder = require('./SaleDetailSeeder')
const LostProductSeeder = require('./LostProductSeeder')
class DataBaseSeeder {
  async run () {
    await RoleSeeder._run()
    await UserSeeder._run()
    await EmployeeSeeder._run()
    await ProductSeeder._run()
    await CustomerSeeder._run()
    await AssignCustomerSeeder._run()
    await AssignCustomerDetailSeeder._run()
    await SaleSeeder._run()
    await SaleDetailSeeder._run()
    await LostProductSeeder._run()
  }
}

module.exports = DataBaseSeeder
