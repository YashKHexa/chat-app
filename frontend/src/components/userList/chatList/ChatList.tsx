import React from 'react'
import { Empty } from 'antd'
import ChatCard from './ChatCard'
import { useChat } from '@/context/ChatContext'
import type { Conversation } from '@/types/types'

const ChatList: React.FC = () => {
  const { filteredConversations, activeId, setActiveId } = useChat()

  if (filteredConversations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No conversations found"
        />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-1.5">
      {filteredConversations.map((conv: Conversation) => (
        <ChatCard
          key={conv.id}
          conversation={conv}
          isActive={conv.id === activeId}
          onClick={() => setActiveId(conv.id)}
        />
      ))}
    </div>
  )
}

export default ChatList
