'use strict'
const User = use('App/Models/User')
const Encryption = use('Encryption')
const Hash = use('Hash')
class AuthController {

  async login({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password'])
    const token = await auth.query()
                  .withRefreshToken()
                  .attempt(email, password, true)
    const user = await User.query().with('employee').with('employee.role').where('email', email).fetch()

    return response.ok({ token, user })
  }

  async logout ({ request, response, auth }) {
    const refreshToken = request.input('refresh_token')
    const decryptedToken = Encryption.decrypt(refreshToken)
    try {
      const user = await auth.getUser()
      await user.tokens()
        .where('token', decryptedToken)
        .delete()
    } catch (error) {}

    return response.ok({
      success: true,
      message: 'Logged out successfully!',
      data: {}
    })
  }

  async generateTokenWithRefresh ({ request, response, auth }) {
    const refreshToken = request.input('refresh_token')
    const token = await auth.newRefreshToken()
      .generateForRefreshToken(refreshToken)
    return response.ok(token)
  }

  async verify ({ auth }) {
    try {
      return await auth.check()
    } catch (error) {
      return false
    }
  }

  async changePassword ({ request, response, auth }) {
    const { user, password, newPassword } = request.only(User.changePassword)
    const userData = await User.find(user)
    console.log(userData)
    const passwordCheck = await Hash.verify(password, userData.password)
    if (!passwordCheck) {
      return response.status(400).send('Invalid Password')
    }

    userData.password = newPassword
    await userData.save()
    return response.ok({
      success: true,
      message: 'Password updated successfully!',
      data: {}
    })
  }
}

module.exports = AuthController
