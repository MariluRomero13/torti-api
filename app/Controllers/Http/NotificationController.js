'use strict'

const Notification = use('App/Models/Notification')
const Ws = use('Ws')
class NotificationController {

  async index({ response }) {
    const notifications = await Notification.query().with('users')
                          .with('users.employee').orderBy('created_at', 'desc').fetch()
    return response.ok(notifications)
  }

  async store({ request, auth, response }) {
    const user = await auth.getUser()
    const notification = new Notification()
    notification.user_id = user.id
    notification.description = request.input('description')
    const newNotification = await notification.save()
    this.sendNotification(newNotification)
    return response.ok({
      success: true,
      mesaage: 'Notification added succesfully'
    })
  }

  async show({ response, params }) {
    const notification = await Notification.find(params.id)
    return response.ok(notification)
  }

  sendNotification (notification) {
    const notificationTopic = Ws.getChannel('notification')
      .topic('notification')

    if (notificationTopic) {
      notificationTopic.broadcast('new:notification', notification)
    }
  }

}

module.exports = NotificationController
