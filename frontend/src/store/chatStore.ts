import { create } from 'zustand'
import { socket } from '@/services/socket'

export interface User {
  id: string
  name: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  text: string
  createdAt: string
}

interface ChatState {
  userName: string
  myId?: string
  users: User[]
  messages: Message[]
  selectedUserId?: string
  search: string
  join: (name: string) => void
  selectUser: (id?: string) => void
  sendMessage: (text: string) => void
  setSearch: (search: string) => void
}

export const useChatStore = create<ChatState>()((set, get) => ({
  userName: '',
  users: [],
  messages: [],
  search: '',
  join: (name) => {
    set({ userName: name })
    if (socket.connected) socket.emit('joinRoom', name)
    else socket.connect()
  },
  selectUser: (id) => set({ selectedUserId: id }),
  sendMessage: (text) => socket.emit('chatMessage', { to: get().selectedUserId, text }),
  setSearch: (search) => set({ search }),
}))

const { setState, getState } = useChatStore

// runs on first connect and on every reconnect (socket id changes each time)
socket.on('connect', () => {
  setState({ myId: socket.id })
  socket.emit('joinRoom', getState().userName)
})

socket.on('onlineUsers', (users: User[]) => setState({ users }))

socket.on('userJoined', (user: User) =>
  setState(({ users }) => ({ users: [...users.filter((u) => u.id !== user.id), user] })),
)

socket.on('userLeft', (id: string) =>
  setState(({ users }) => ({ users: users.filter((u) => u.id !== id) })),
)

socket.on('chatMessage', (message: Message) =>
  setState(({ messages }) => ({ messages: [...messages, message] })),
)
