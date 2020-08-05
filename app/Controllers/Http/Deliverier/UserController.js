'use strict'
const Hash = use('Hash')
const { validate } = use('Validator')
class UserController {
    async update({ request, response, auth }) {

        const rules = {
            password: 'required',
            new_password: 'required'
        }

        const validation = await validate(request.all(), rules)

        if(validation.fails()) {
            return response.badRequest({
                status: false,
                message: "Incomplete fields"
            })
        }
        
        const user = await auth.getUser()
        const verifyPassword = await Hash.verify(
            request.input('password'),
            user.password
        )

        if(!verifyPassword) {
            return response.badRequest({
                status: false,
                message: "Current password couldn´t not be verified"
            })
        }

        user.password = request.input('new_password')
        await user.save()

        return response.ok({
            status: true,
            message: 'Password has been updated'
        })
    }
}


module.exports = UserController
