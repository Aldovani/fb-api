import Route from '@ioc:Adonis/Core/Route'

//Criando rota de registro
Route.post('/users/register', 'Users/Register.store')
Route.get('/users/register/:key', 'Users/Register.show')
Route.put('/users/register/', 'Users/Register.update')

//Criando rota de recuperação de senha
Route.post('/users/forgot-password', 'Users/ForgotPassword.store')
Route.get('/users/forgot-password/:key', 'Users/ForgotPassword.show')
Route.put('/users/forgot-password/', 'Users/ForgotPassword.update')

//Editar perfil
Route.put('/users', 'Users/Main.update').middleware('auth')
Route.get('/users', 'Users/Main.show').middleware('auth')

//Rota de avatar
Route.put('/users/avatar', 'Users/Avatar.update').middleware('auth')
Route.delete('/users/avatar', 'Users/Avatar.destroy').middleware('auth')

//Search
Route.get('/users/search', 'Users/Search.show')
