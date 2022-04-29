import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Post, Reaction } from 'App/Models'
import { UpdateValidator } from 'App/Validators/Reaction/Main'

export default class ReactionsController {
  public async update({ request, auth }: HttpContextContract) {
    const { postId, type } = await request.validate(UpdateValidator)

    const post = await Post.findOrFail(postId)
    const searchPayload = { postId, userId: auth.user!.id }
    const updatePayload = { type }

    const reaction = await post.related('reactions').updateOrCreate(searchPayload, updatePayload)
    return reaction
  }

  public async destroy({ params }: HttpContextContract) {
    const reaction = await Reaction.findOrFail(params.id)
    await reaction.delete()
  }
}
