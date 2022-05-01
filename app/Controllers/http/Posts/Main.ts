import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/Post/Main'
import { Post, User } from 'App/Models'
import fs from 'fs'
import Application from '@ioc:Adonis/Core/Application'

export default class PostController {
  public async index({ request, auth }: HttpContextContract) {
    const { username } = request.qs()

    const user = (await User.findBy('username', username)) || auth.user!

    await user.load('posts', (query) => {
      query.orderBy('id', 'desc')
      query.preload('media')

      query.preload('user', (query) => {
        query.select(['id', 'name', 'username'])
        query.preload('avatar')
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'like')
        query.as('likeCont')
      })
      query.withCount('reactions', (query) => {
        query.where('type', 'love')
        query.as('loveCont')
      })
      query.withCount('reactions', (query) => {
        query.where('type', 'haha')
        query.as('hahaCont')
      })
      query.withCount('reactions', (query) => {
        query.where('type', 'sad')
        query.as('sadCont')
      })
      query.withCount('reactions', (query) => {
        query.where('type', 'angry')
        query.as('angryCont')
      })

      query.preload('reactions', () => {
        query.where('user_id', auth.user!.id).first()
      })

      query.preload('comments', (query) => {
        query.preload('user', (query) => {
          query.select(['id', 'name', 'username'])
          query.preload('avatar')
        })
      })

      query.withCount('comments')
    })

    return user.posts
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const post = await auth.user!.related('posts').create(data)

    return post
  }

  public async update({ request, auth, response, params }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const post = await Post.findOrFail(params.id)

    if (auth.user!.id !== post.userId) {
      return response.unauthorized()
    }
    await post.merge(data).save()
    return post
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    if (auth.user!.id !== post.userId) {
      return response.unauthorized()
    }

    await post.load('media')

    if (post.media) {
      fs.unlinkSync(Application.tmpPath(post.media.file_name))
      await post.media.delete()
    }
    await post.delete()
  }
}
