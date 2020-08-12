'use strict'

/**@type {typeof import('@adonisjs/framework/src/Route/Manager}')} */
const Route = use('Route')

Route.group(() => {
    Route.post('/login', 'AuthController.login').validator('Auth/Login')
    Route.post('/login/refresh-token', 'AuthController.generateTokenWithRefresh')
        .validator('Auth/LoginRefresh')
    Route.post('/logout', 'AuthController.logout')
        .validator('Auth/LoginRefresh')
})
.namespace('Deliverier')
.prefix('api/deliverier')

Route.group(() => {
    Route.put('/update-password', 'UserController.update')
    Route.get('/assignment-customers', 'AssignmentCustomerController.index')
    Route.get('/assignment-products', 'AssignmentProductController.index')
    Route.post('/sales', 'SaleController.store')
    Route.post('/sales-histories', 'SaleController.getSalesHistory')
})
.middleware('auth:jwtDeliverier')
.namespace('Deliverier')
.prefix('api/deliverier')

