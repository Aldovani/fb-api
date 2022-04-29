import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { reactionTypes } from 'App/Utils'
export default class Reactions extends BaseSchema {
  protected tableName = 'reactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enu('type', reactionTypes)
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table
        .integer('post_id')
        .unsigned()
        .references('posts.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
