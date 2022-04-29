import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { storeValidator } from 'App/Validators/Message/Main'
import { Conversation } from 'App/Models'

export default class MessageController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { content, receiverId } = await request.validate(storeValidator)

    if (auth.user!.id === receiverId) {
      return response.badRequest()
    }

    const existsConversation = await Conversation.query()
      .where({
        userIdOne: auth.user!.id,
        userIdTwo: receiverId,
      })
      .orWhere({
        userIdOne: receiverId,
        userIdTwo: auth.user!.id,
      })
      .first()

    if (existsConversation) {
      const message = await existsConversation
        .related('messages')
        .create({ content, userId: auth.user!.id })

      return message
    }

    const conversation = await Conversation.create({
      userIdOne: auth.user!.id,
      userIdTwo: receiverId,
    })

    const message = await conversation.related('messages').create({
      content,
      userId: auth.user!.id,
    })
    return message
  }
}
