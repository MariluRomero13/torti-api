'use strict'
const Encryption = use('Encryption')

class AuthController {
    async login ({ request, response, auth }) {
        const { email, password } = request.only(['email', 'password'])
        const switchedAuth = auth.authenticator('jwtDeliverier')
        const token = await switchedAuth.query()
            .withRefreshToken()
            .attempt(email, password)
        
        return response.ok(token)
    }

    async generateTokenWithRefresh({ request, response, auth }) {
        const refreshToken = request.input('refresh_token')
        const switchedAuth = auth.authenticator('jwtDeliverier')
        const token = await switchedAuth.newRefreshToken()
            .generateForRefreshToken(refreshToken)
        
        return response.ok(token)
    }

    async logout ({ request, response, auth }) {
        const refreshToken = request.input('refresh_token')
        const decryptedToken = Encryption.decrypt(refreshToken)
        try {
            const user = await auth.getUser()
            await user.tokens()
                .where('token', decryptedToken)
                .delete()
        } catch (error) {
            console.log(error);
        }

        return response.ok({
            success: true,
            message: 'Logged out successfully'
        })

    }
}

module.exports = AuthController
