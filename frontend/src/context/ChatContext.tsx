import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Conversation, Message } from '../types/types'

export interface ChatContextType {
  currentUserName: string
  setCurrentUserName: (name: string) => void
  conversations: Conversation[]
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
  activeId: string
  setActiveId: (id: string) => void
  activeConversation?: Conversation
  messages: Message[]
  sendMessage: (text: string) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  filteredConversations: Conversation[]
}

const defaultContextValue: ChatContextType = {
  currentUserName: '',
  setCurrentUserName: () => {},
  conversations: [],
  setConversations: () => {},
  activeId: '',
  setActiveId: () => {},
  activeConversation: undefined,
  messages: [],
  sendMessage: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
  filteredConversations: [],
}

const ChatContext = createContext<ChatContextType>(defaultContextValue)

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUserName, setCurrentUserNameState] = useState<string>(() => {
    return localStorage.getItem('chat_username') || ''
  })
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>({})
  const [searchTerm, setSearchTerm] = useState<string>('')

  const setCurrentUserName = (name: string) => {
    setCurrentUserNameState(name)
    localStorage.setItem('chat_username', name)
  }

  useEffect(() => {
    const handleUserChange = () => {
      const stored = localStorage.getItem('chat_username')
      if (stored && stored !== currentUserName) {
        setCurrentUserName(stored)
      }
    }

    handleUserChange()
    window.addEventListener('chat-user-change', handleUserChange)
    window.addEventListener('storage', handleUserChange)
    return () => {
      window.removeEventListener('chat-user-change', handleUserChange)
      window.removeEventListener('storage', handleUserChange)
    }
  }, [currentUserName])

  const activeConversation =
    conversations.find((c) => c.id === activeId) || undefined
  const messages = activeId ? messagesMap[activeId] || [] : []

  const handleSelectConversation = (id: string) => {
    setActiveId(id)
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    )
  }

  const sendMessage = (text: string) => {
    if (!activeId) return
    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'currentUser',
      text,
      timestamp: time,
      isOutgoing: true,
    }

    setMessagesMap((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMessage],
    }))

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              lastMessage: text,
              time: 'Just now',
            }
          : c
      )
    )
  }

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <ChatContext.Provider
      value={{
        currentUserName,
        setCurrentUserName,
        conversations,
        setConversations,
        activeId,
        setActiveId: handleSelectConversation,
        activeConversation,
        messages,
        sendMessage,
        searchTerm,
        setSearchTerm,
        filteredConversations,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = (): ChatContextType => {
  return useContext(ChatContext) || defaultContextValue
}
