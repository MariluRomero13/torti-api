'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
const Product = use('App/Models/Products/Product')
class ProductController {

  async index ({ response }) {
    const products = await Product.all()
    return response.ok(products)
  }

  async indexHasStock ({ response }) {
    const products = await Product.query().has('stock').with('stock').fetch()
    return response.ok(products)
  }

  async store ({ request, response }) {
    const productData = request.only(Product.store)
    const product = await Product.create(productData)
    return response.ok({
      success: true,
      message: 'Product added succesfully',
      data: product
    })
  }

  async update ({ params, request, response }) {
    const productData = request.only(Product.update)
    const product = await Product.find(params.id)
    product.merge(productData)
    await product.save()
    return response.ok({
      success:true,
      message:'product updated successfully',
      data: product
    })
  }

  async destroy ({ params, response }) {
    const product = await Product.find(params.id)
    product.is_active = !product.is_active
    await product.save()
    return response.ok({
      success: true,
      message: 'Product deleted successfully',
      data: ''
    })
  }
}

module.exports = ProductController
