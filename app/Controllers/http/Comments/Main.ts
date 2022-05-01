import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/comment/Main'
import { Post, Comment } from 'App/Models'

export default class MainsController {
  public async store({ auth, request }: HttpContextContract) {
    const { content, postId } = await request.validate(StoreValidator)

    const post = await Post.findOrFail(postId)

    const comment = await post.related('comments').create({
      content,
      userId: auth.user!.id,
    })

    return comment
  }

  public async update({ auth, request, response, params }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)

    const comment = await Comment.findOrFail(params.id)

    if (comment.userId !== auth.user!.id) {
      return response.unauthorized()
    }

    comment.merge(data)

    await comment.save()

    return comment
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const comment = await Comment.findOrFail(params.id)

    if (auth.user!.id !== comment.userId) {
      return response.unauthorized()
    }

    await comment.delete()
  }
}
