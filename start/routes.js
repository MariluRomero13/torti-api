'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/api', 'DashboardController.welcome')

Route.group(() => {
  // Login
  Route.post('/login', 'AuthController.login').validator('Auth/Login')
  Route.post('/login/refresh-token', 'AuthController.generateTokenWithRefresh')
    .validator('Auth/LoginRefresh')
  Route.post('/logout', 'AuthController.logout')
    .validator('Auth/LoginRefresh')
  Route.post('/change/password', 'AuthController.changePassword')
    .validator('Auth/Password').middleware(['auth:jwt'])

}).middleware(['cors']).prefix('api/')

// Routes of panel
Route.group(() => {
  Route.get('/dashboard', 'DashboardController.index')
  Route.get('/roles', 'RoleController.index')
  Route.get('/notifications', 'NotificationController.index')
  Route.post('/notifications', 'NotificationController.store')
  Route.get('/notifications/:id', 'NotificationController.show')
  Route.resource('employees', 'EmployeeController').validator(new Map([
    [['employees.store'], ['Employee/StoreEmployee']],
    [['employees.update'], ['Employee/UpdateEmployee']]
  ]))
  Route.resource('products', 'ProductController').validator(new Map([
    [['products.store'], ['Product/StoreProduct']],
    [['products.update'], ['Product/UpdateProduct']]
  ]))
  Route.resource('assignment-customers', 'AssignCustomerController').validator(new Map([
    [['assignment-customers.store'], ['AssignCustomer/StoreAssignCustomer']],
    [['assignment-customers.update'], ['AssignCustomer/UpdateAssignCustomer']]
  ]))
  Route.resource('customers','CustomerController').validator(new Map([
    [['customer.store'],['Customer/StoreUpdateCustomer']],
    [['customer.update'],['Customer/StoreUpdateCustomer']]
  ]))
  Route.resource('stock','StockController').validator(new Map([
    [['stock.store'],['Stock/StoreStock']],
    [['stock.update'],['Stock/UpdateStock']]
  ]))
  Route.get('unassigned-customers', 'AssignCustomerController.getUnassignedCustomers')

  // Deliveries
  Route.get('daily-deliveries', 'DeliveryController.getDailyDeliveries')
  Route.get('record-deliveries', 'DeliveryController.getRecordDeliveries')
  Route.get('future-deliveries', 'DeliveryController.getFutureDeliveries')
  Route.get('sold-products/:id', 'DeliveryController.getSoldProducts')
  Route.resource('deliveries','DeliveryController').validator(new Map([
    [['deliveries.store'],['Delivery/StoreUpdateDelivery']],
    [['deliveries.update'],['Delivery/StoreUpdateDelivery']]
  ]))
})
  .middleware(['auth:jwt', 'cors'])
  .prefix('api/')



//Routes for mobile app
require('./routes/deliverier')
