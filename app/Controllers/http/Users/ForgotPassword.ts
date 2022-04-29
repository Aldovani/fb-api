import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/ForgotPasswords'
import { User, UserKey } from 'App/Models/index'
import { v4 as uuid } from 'uuid'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class ForgotPasswordsController {
  public async store({ request }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)
    const user = await User.findByOrFail('email', email)

    const key = uuid() + user.id
    user.related('keys').create({ key })
    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`
    await Mail.send((message) => {
      message.to(email)
      message.from('contato@Facebook.com', 'Facebook')
      message.subject('Recuperação de senha')
      message.htmlView('emails/forgotPassword', { link })
    })
  }

  public async show({ params, response }: HttpContextContract) {
    await UserKey.findByOrFail('key', params.key)

    return response.ok({ message: 'Ok' })
  }

  public async update({ request, response }: HttpContextContract) {
    const { password, key } = await request.validate(UpdateValidator)
    const userKey = await UserKey.findByOrFail('key', key)
    const user = await userKey.related('user').query().firstOrFail()

    user.merge({ password })
    await user.save()

    await userKey.delete()

    return response.ok({ message: 'Ok' })
  }
}
