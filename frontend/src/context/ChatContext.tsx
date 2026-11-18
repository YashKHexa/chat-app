import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { connectsocket } from '@/services/socket'
import type { Socket } from 'socket.io-client'

export interface MessageItem {
  id: string | number
  sender: string
  text: string
  time: string
  isOutgoing: boolean
}

export interface ChatContextType {
  currentUserName: string
  setCurrentUserName: (name: string) => void
  messages: MessageItem[]
  sendMessage: (text: string) => void
  activeConversation: any
  filteredConversations: any[]
  activeId: string
  setActiveId: (id: string) => void
}

const defaultRoom = {
  id: '1',
  name: 'Group Chat',
  avatarText: 'GC',
  avatarBg: 'var(--theme-color-primary)',
  avatarColor: 'var(--theme-color-on-brand)',
  lastMessage: 'Live Room',
  time: '',
}

const ChatContext = createContext<ChatContextType>({
  currentUserName: '',
  setCurrentUserName: () => {},
  messages: [],
  sendMessage: () => {},
  activeConversation: defaultRoom,
  filteredConversations: [defaultRoom],
  activeId: '1',
  setActiveId: () => {},
})

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUserName, setCurrentUserNameState] = useState<string>(
    () => localStorage.getItem('chat_username') || ''
  )
  const [messages, setMessages] = useState<MessageItem[]>([])
  const socketRef = useRef<Socket | null>(null)

  const setCurrentUserName = (name: string) => {
    setCurrentUserNameState(name)
    localStorage.setItem('chat_username', name)
  }

  // 1. Socket connect aur listen karna
  useEffect(() => {
    if (!currentUserName) return

    const socket = connectsocket()
    socketRef.current = socket

    socket.on('connect', () => {
      console.log('✅ Connected:', socket.id)
      socket.emit('joinRoom', currentUserName)
    })

    // Jab kisi ka message aaye
    socket.on('chatMessage', (msg: { id: string | number; sender: string; text: string; time: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          ...msg,
          isOutgoing: msg.sender === currentUserName,
        },
      ])
    })

    // Jab koi naya user join kare
    socket.on('roomNotice', (newUser: string) => {
      console.log(`${newUser} joined to group!`)
    })

    return () => {
      socket.disconnect()
    }
  }, [currentUserName])

  // 2. Message bhejna
  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const msg = {
      id: Date.now(),
      sender: currentUserName,
      text: text.trim(),
      time: time,
    }

    // Socket ko bhejo
    socketRef.current?.emit('chatMessage', msg)
  }

  return (
    <ChatContext.Provider
      value={{
        currentUserName,
        setCurrentUserName,
        messages,
        sendMessage,
        activeConversation: defaultRoom,
        filteredConversations: [defaultRoom],
        activeId: '1',
        setActiveId: () => {},
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
