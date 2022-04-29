import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { Conversation, User } from 'App/Models'
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
}
