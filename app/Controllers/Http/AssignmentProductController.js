'use strict'

const AssignmentProduct = use('App/Models/Products/AssignmentProduct')
const Stock = use('App/Models/Products/Stock')
class AssignmentProductController {
  /**
   * Show a list of all assignproducts.
   * GET assignproducts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const assignments = await AssignmentProduct.query()
                                                .with('employee')
                                                .with('stock.product')
                                                .fetch()
    return response.ok(assignments)
  }

  /**
   * Render a form to be used for creating a new assignproduct.
   * GET assignproducts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new assignproduct.
   * POST assignproducts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const assignmentData = request.only(AssignmentProduct.store)
    const stock = await Stock.find(assignmentData.stock_id)

    if(assignmentData.quantity > 0 && assignmentData.quantity <= stock.actual_stock) {
      const assignment = await AssignmentProduct.create(assignmentData)
      stock.actual_stock = stock.actual_stock - assignmentData.quantity
      await stock.save()
      return response.ok({
        success: true,
        message: 'Assignment added succesfully',
        data: assignment
      })
    } else {
      return response.ok({ 
        success: false,
        message: 'Any actions executed',
        data: {}
      })
    }
  }

  /**
   * Display a single assignproduct.
   * GET assignproducts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing assignproduct.
   * GET assignproducts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update assignproduct details.
   * PUT or PATCH assignproducts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const assignmentData = request.only(AssignmentProduct.update)
    const stock = await Stock.find(assignmentData.stock_id)

    if(assignmentData.quantity > 0 && assignmentData.quantity <= stock.actual_stock) {
      const assignment = await AssignmentProduct.find(params.id)
      assignment.merge(assignmentData)
      await assignment.save()
      //actual=stock.actual_stock
      //stock.actual_stock = stock.actual_stock + stock.actual_stock - assignment.quantity 
      stock.actual_stock = stock.actual_stock - assignmentData.quantity
      await stock.save()
      return response.ok({
        success: true,
        message: 'Assignment updated succesfully',
        data: assignment
      })
    } else {
      return response.ok({ 
        success: false,
        message: 'Any action executed',
        data: {}
      })
    }
  }

  /**
   * Delete a assignproduct with id.
   * DELETE assignproducts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AssignmentProductController
