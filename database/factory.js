'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Role', (faker, i, data) => {
  return {
    name: data.name
  }
})


Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    username: data.username,
    email: data.email,
    password: data.password,
    is_active: data.is_active
  }
})

Factory.blueprint('App/Models/Employees/Employee', (faker, i, data) => {
  return {
    user_id: data.user_id,
    role_id: data.role_id,
    name: data.name,
    paternal: data.paternal,
    maternal: data.maternal,
    phone: data.phone,
    address: data.address,
    is_active: data.is_active
  }
})

Factory.blueprint('App/Models/Products/Product', (faker, i, data) => {
  return {
    name: data.name,
    unit_price: data.unit_price
  }
})

Factory.blueprint('App/Models/Customers/Customer', (faker, i, data) => {
  return {
    name: data.name,
    phone: data.phone,
    address: data.address,
    latitude: data.latitude,
    longitude: data.longitude
  }
})


Factory.blueprint('App/Models/Customers/AssignmentCustomer', (faker, i, data) => {
  return {
    employee_id: data.employee_id,
    customer_id: data.customer_id
  }
})
