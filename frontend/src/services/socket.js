import { io, Socket } from 'socket.io-client'

export function connectsocket()  {
  return io('http://localhost:6969');
}
