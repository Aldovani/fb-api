import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator } from 'App/Validators/User/Avatar'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import fs from 'fs'

export default class UserAvatarController {
  public async update({ request, auth }: HttpContextContract) {
    const avatar = await Database.transaction(async (trx) => {
      const { file } = await request.validate(UpdateValidator)
      const user = auth.user!.useTransaction(trx)

      const searchPayload = {}
      const savePayload = {
        file_category: 'avatar' as any,
        file_name: `${new Date().getTime()}.${file.extname}`,
      }

      const avatar = await user.related('avatar').firstOrCreate(searchPayload, savePayload)

      await file.move(Application.tmpPath('uploads'), {
        name: avatar.file_name,
        overwrite: true,
      })
      return avatar
    })
    return avatar
  }

  public async destroy({ auth }: HttpContextContract) {
    const response = await Database.transaction(async (trx) => {
      const user = auth.user!.useTransaction(trx)

      const avatar = await user
        .related('avatar')
        .query()
        .where({ file_category: 'avatar' })
        .firstOrFail()

      fs.unlinkSync(Application.tmpPath(`uploads`, avatar.file_name))
      await avatar.delete()
    })
    return response
  }
}
