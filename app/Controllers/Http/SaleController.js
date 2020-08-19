'use strict'


const Database = use('Database')
const Sale = use('App/Models/Sales/Sale')
const SaleDetails = use('App/Models/Sales/SaleDetail')
class SaleController {
  /**
   * Show a list of all sales.
   * GET sales
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const sales = await Sale.query()
                            .where('status',1)
                            .with('assignment.assignment.customers')
                            .with('assignment.assignment.employees')
                            .fetch()

    return response.ok(sales)  
  }

  async getSaleDetails({request, response, view,params }){
    const details = await SaleDetails.query()
                                      .where('sale_id',params.id)
                                      .with('product')
                                      .fetch()

    return response.ok(details)

  }

  async getDateFilteredSales({request,params,response}){
    const start_date = request.input('start_date')
    const end_date = request.input('end_date')
    const sales = await Sale.query()
                            .where('status',1)
                            .whereBetween(Database.raw('DATE_FORMAT(created_at, "%Y-%m-%d")'),[start_date,end_date])
                            .with('assignment.assignment.customers')
                            .with('assignment.assignment.employees')
                            .fetch()

    return response.ok(sales)
  }

  /**
   * Render a form to be used for creating a new sale.
   * GET sales/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new sale.
   * POST sales
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single sale.
   * GET sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing sale.
   * GET sales/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update sale details.
   * PUT or PATCH sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a sale with id.
   * DELETE sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SaleController
