'use strict'
const LostProduct = use('App/Models/Products/LostProduct')
const Sale = use('App/Models/Sales/Sale')
const AssignmentDetail = use('App/Models/Customers/AssignmentCustomerDetail')
const moment = use('moment')
const Database = use('Database')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with devolutions
 */
class DevolutionController {
  /**
   * Show a list of all devolutions.
   * GET devolutions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params, request, response, auth }) {
        

    const devolutions = await LostProduct.query()
                                  .with('product')
                                  .with('sale.assignment.assignment.employees')
                                  .with('sale.assignment.assignment.customers')
                                  .fetch()
    /*const devolutions = await Sale.query()
                            .where('status',4)
                            .with('assignment.assignment.customers')
                            .with('assignment.assignment.employees')
                            .with('lost_products.product')
                            .fetch()
     */  
    return response.ok(devolutions)
}

async getDateFilteredDevolutions({params,request,response}){
  const start_date = request.input('start_date')
  const end_date = request.input('end_date')
  const devolutions = await LostProduct.query()
                                        .whereBetween(Database.raw('DATE_FORMAT(created_at, "%Y-%m-%d")'),[start_date,end_date])
                                        .with('product')
                                        .with('sale.assignment.assignment.employees')
                                        .with('sale.assignment.assignment.customers')
                                        .fetch()
  return response.ok(devolutions)
}

  /**
   * Render a form to be used for creating a new devolution.
   * GET devolutions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new devolution.
   * POST devolutions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single devolution.
   * GET devolutions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing devolution.
   * GET devolutions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update devolution details.
   * PUT or PATCH devolutions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a devolution with id.
   * DELETE devolutions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = DevolutionController
