import Route from '@ioc:Adonis/Core/Route'
import './auth'
import './users'
import './uploads'
import './post'
import './reactions'
import './follows'
import './profile'
import './messages'
import './comment'
import './conversation'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.on('/test').render('test')
Route.on('/chat').render('chat')

Route.get('/user-register', async ({ view }) => {
  return view.render('emails/register')
})
