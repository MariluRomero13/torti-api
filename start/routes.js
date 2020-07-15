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

Route.get('/api', ({ response }) => {
    response.send({message:"esta es la api"})
})

Route.on('/').render('welcome')


Route.group(() => {
  // Login

  Route.post('/login', 'AuthController.login').validator('Auth/Login')
  Route.post('/login/refresh-token', 'AuthController.generateTokenWithRefresh')
    .validator('Auth/LoginRefresh')
  Route.post('/logout', 'AuthController.logout')
    .validator('Auth/LoginRefresh')

}).middleware(['cors']).prefix('api/')
