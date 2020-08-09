'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const AssignmentCustomerDetail = use('App/Models/Customers/AssignmentCustomerDetail')
const Sale = use('App/Models/Sales/Sale')
const moment = use('moment')
class DeliveryController {

  async getDailyDeliveries({ response }) {
    const now = moment().format('YYYY-MM-DD')
    const deliveries = await AssignmentCustomerDetail.query()
    .with('assignment.customers')
    .with('assignment.employees')
    .with('sale')
    .where('delivery_date', now)
    .fetch()
    return response.ok(deliveries);
  }

  async getRecordDeliveries({ response }) {
    const deliveries = await AssignmentCustomerDetail.query()
    .with('assignment.customers')
    .with('assignment.employees')
    .with('sale')
    .where('status', 1)
    .orWhere('status', 2)
    .fetch()
    return response.ok(deliveries);
  }

  async getFutureDeliveries({ response }) {
    const deliveries = await AssignmentCustomerDetail.query()
    .with('assignment.customers')
    .with('assignment.employees')
    .where('status', 0)
    .fetch()
    return response.ok(deliveries);
  }

  async store ({ request, response }) {
    const assignmenData = request.only(AssignmentCustomerDetail.store)
    const assignmentDetail = await AssignmentCustomerDetail.create(assignmenData)
    return response.ok({
      success: true,
      message: 'Delivery added succesfully',
      data: assignmentDetail
    })
  }

  async getSoldProducts ({ params, response }) {
    const assignmentDetail = await AssignmentCustomerDetail.find(params.id)
    const sales = await Sale.query()
                  .with('details')
                  .with('details.product')
                  .where('assignments_customers_details_id', assignmentDetail.id)
                  .fetch()

    const lostProducts = await Sale.query()
                  .with('lost_products')
                  .with('lost_products.product')
                  .where('assignments_customers_details_id', assignmentDetail.id)
                  .fetch()

    return response.ok({ sales, lostProducts })

  }

  async update ({ params, request, response }) {
    const assignmenData = request.only(AssignmentCustomerDetail.update)
    const assignmentDetail = await AssignmentCustomerDetail.find(params.id)
    assignmentDetail.merge(assignmenData)
    await assignmentDetail.save()
    return response.ok({
      success:true,
      message:'Delivery updated successfully',
      data:assignmentDetail
    })
  }

  async destroy ({ params, response }) {
    const assignmentDetail = await AssignCustomerDetail.find(params.id)
    assignmentDetail.status = 2
    await assignmentDetail.save()
    return response.ok({
      success: true,
      message: 'Delivery was cancelled'
    });
  }
}

module.exports = DeliveryController
