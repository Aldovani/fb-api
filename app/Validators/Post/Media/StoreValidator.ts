import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    file: schema.file({
      size: '500mb',
      extnames: ['jpg', 'jpeg', 'png', 'mp4', 'mov'],
    }),
  })

  public cacheKey = this.ctx.routeKey

  public messages = {}
}
