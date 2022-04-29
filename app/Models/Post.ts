import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  BelongsTo,
  belongsTo,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import { File, User, Reaction } from 'App/Models'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public description: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasOne(() => File, {
    foreignKey: 'owner_id',
    onQuery: (query) => query.where('file_category', 'post'),
  })
  public media: HasOne<typeof File>

  // @hasMany(()=> Comment)
  // public comments: HasMany<typeof Comment>

  // @computed()
  // public get commentsCount() {
  // return this.comments.comments_count
  // }

  @hasMany(() => Reaction, { serializeAs: null })
  public reactions: HasMany<typeof Reaction>

  @computed()
  public get reactionsCount() {
    return {
      like: this.$extras.likeCont || 0,
      love: this.$extras.loveCont || 0,
      haha: this.$extras.hahaCont || 0,
      sad: this.$extras.sadCont || 0,
      angry: this.$extras.angryCont || 0,
    }
  }
  @computed()
  public get activeReaction() {
    return this.reactions && this.reactions.length ? this.reactions[0].type : null
  }
}
