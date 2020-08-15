'use strict'
const Notification = use('App/Models/Notification')
const Ws = use('Ws')
class NotificationController {
    async store ({ request, response, auth }) {
        const data = {
            user_id: auth.user.id,
            description: request.input('description')
        }
        const notification = await Notification
            .create(data)
        const topic = Ws.getChannel('notification')
            .topic('notification')
        if(topic) {
            topic.broadcast('notification', { notification })
        }

        return response.ok({
            status: true,
            message: 'The notification was created successfully'
        })
    }
}

module.exports = NotificationController
