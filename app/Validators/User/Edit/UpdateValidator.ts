import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
    name: schema.string({ trim: true }),
    username: schema.string({ trim: true }),
    password: schema.string.optional({ trim: true }, [rules.confirmed('passwordConfirmation')]),
  })

  public cacheKey = this.ctx.routeKey
  public messages = {}
}
