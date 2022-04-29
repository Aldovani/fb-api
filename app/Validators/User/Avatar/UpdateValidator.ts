import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    file: schema.file({
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png'],
    }),
  })

  public cacheKey = this.ctx.routeKey
  public messages = {}
}
