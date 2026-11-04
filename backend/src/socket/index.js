import { Server } from 'socket.io'
import { config } from '../config/index.js'

export function initSocket(port) {
  const io = new Server(port, {
    cors: { origin: config.clientUrl },
  })

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`)
    })
  })

  return io
}
