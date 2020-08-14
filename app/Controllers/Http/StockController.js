'use strict'

const ProductController = require('./ProductController')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Stock = use('App/Models/Products/Stock')

class StockController {

  async index ({ request, response, view }) {
    const stocks = await Stock.query()
      .with('product')
      .fetch()
    return response.ok(stocks)
  }

  async store ({ request, response }) {
    const stockData = request.only(Stock.store)
    let stock = await Stock.create(stockData)
    return response.ok({
      success: true,
      message: 'Stock added successfully',
      data: stock
    })
  }

  


  async update ({ params, request, response }) {
    const stockData = request.only(Stock.update)
    const stock = await Stock.find(params.id)
    stock.merge(stockData)
    await stock.save()
    return response.ok({
      success: true,
      message: 'Stock updated successfully',
      data:''
    })
  }

  async destroy ({ params, request, response }) {
    return response.ok({
      success: true,
      message: 'No actions have been executed',
      date:''
    })
  }
}

module.exports = StockController
