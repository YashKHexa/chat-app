import { io, Socket } from 'socket.io-client'

export function connectsocket(): Socket {
  return io('import.meta.env.VITE_SOCKET_URL')
}

export const connectSocket = connectsocket
