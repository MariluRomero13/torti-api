'use strict'

class AssignmentProductController {
    async index ({ request, response, auth }) {
        const user = await auth.getUser()
        const assignmentProducts =  await user.employee()
        .with('assignmentProducts', builder => {
            builder.with('stock.product')
        })
        .select('id')
        .fetch()

        return response.ok(assignmentProducts)
    }
}

module.exports = AssignmentProductController
