import { io, Socket } from 'socket.io-client'

export function connectsocket(): Socket {
  return io('http://localhost:6969')
}

export const connectSocket = connectsocket
