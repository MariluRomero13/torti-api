'use strict'
const Customer = use('App/Models/Customers/Customer')
class CustomerController {

  async index ({ request, response, view }) {
    const customers = await Customer.all()
    return response.ok(customers)
  }

  async store ({ request, response }) {
    const customerData = request.only(Customer.store)
    const customer = await Customer.create(customerData)
    return response.ok({
      success: true,
      message: 'Customer added succesfully',
      data: customer
    })
  }

  async show ({ params, request, response, view }) {
    const customer = await Customer.find(params.id)
    return response.ok(customer)
  }

  async update ({ params, request, response }) {
    const customerData = request.only(Customer.update)
    const customer = await Customer.find(params.id)
    customer.merge(customerData)
    await customer.save()
    return response.ok({
      success:true,
      message:'Customer updated successfully',
      data:customer
    })
  }


  async destroy ({ params, request, response }) {
    const customer = await Customer.find(params.id)
    customer.is_active = !customer.is_active
    await customer.save()
    return response.ok({
      success: true,
      message: 'Customer deleted success'
    })
  }
}

module.exports = CustomerController
