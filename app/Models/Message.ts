import { BaseModel, column, belongsTo, BelongsTo, afterCreate } from '@ioc:Adonis/Lucid/Orm'
import { Conversation, User } from 'App/Models'
import Ws from 'App/Services/Ws'
export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public conversationId: number

  @column()
  public userId: number

  @belongsTo(() => Conversation)
  public conversation: BelongsTo<typeof Conversation>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @afterCreate()
  public static dispatchMessage(message: Message) {
    Ws.io.to(`room-${message.conversationId}`).emit('newMessage', {
      content: message.content,
      userId: message.userId,
    })
  }
}
