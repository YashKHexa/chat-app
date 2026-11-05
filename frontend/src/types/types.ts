export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  isOutgoing: boolean
}

export interface Conversation {
  id: string
  name: string
  avatarText: string
  avatarBg: string
  avatarColor: string
  lastMessage: string
  time: string
  unreadCount?: number
}

