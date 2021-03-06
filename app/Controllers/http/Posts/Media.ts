import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import { Post } from 'App/Models'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import { StoreValidator } from 'App/Validators/Post/Media'

export default class PostMediaController {
  public async store({ request, response, auth, params }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { file } = await request.validate(StoreValidator)
      const post = await Post.findOrFail(params.id)

      if (auth.user!.id !== post.userId) {
        return response.unauthorized()
      }

      post.useTransaction(trx)

      const media = await post.related('media').create({
        file_category: 'post',
        file_name: `${cuid()}.${file.extname}`,
      })

      await file.move(Application.tmpPath('uploads'), {
        name: media.file_name,
      })
    })
  }
}
