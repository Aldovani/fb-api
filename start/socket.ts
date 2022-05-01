import Ws from 'App/Services/Ws'

Ws.start((socket) => {
  socket.on('creat', (room) => {
    socket.join(room)
  })
})
