'use strict'
const Sale = use('App/Models/Sales/Sale')
const SaleDetails = use('App/Models/Sales/SaleDetail')
class PendingPaymentController {
  /**
   * Show a list of all pendingpayments.
   * GET pendingpayments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const sales = await Sale.query()
                            .where('status', 2)
                            .with('assignment.assignment.customers')
                            .with('assignment.assignment.employees')
                            .fetch()
    return response.ok(sales) 
  }

  async getPendingPaymentsDetails({request, response, view,params }){
    const details = await SaleDetails.query()
                                      .where('sale_id',params.id)
                                      .with('product')
                                      .fetch()

    return response.ok(details)

  }

  /**
   * Render a form to be used for creating a new pendingpayment.
   * GET pendingpayments/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new pendingpayment.
   * POST pendingpayments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single pendingpayment.
   * GET pendingpayments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing pendingpayment.
   * GET pendingpayments/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pendingpayment details.
   * PUT or PATCH pendingpayments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pendingpayment with id.
   * DELETE pendingpayments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PendingPaymentController
