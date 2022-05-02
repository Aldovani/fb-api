import { User } from 'App/Models'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Database from '@ioc:Adonis/Lucid/Database'

export const isFollowing = async (user: User, Auth: AuthContract) => {
  const following = await Database.query()
    .from('followers')
    .where('follower_id', Auth.user!.id)
    .first()

  user.$extras.isFollowing = following ? true : false
}
