import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { FileCategory } from 'App/Utils'
import Env from '@ioc:Adonis/Core/Env'

export default class File extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: null })
  public file_category: FileCategory
  @column({ serializeAs: null })
  public file_name: string

  @column({ serializeAs: null })
  public owner_id: number

  @computed()
  public get url() {
    return `${Env.get('APP_URL')}/uploads/${this.file_name}`
  }
}
