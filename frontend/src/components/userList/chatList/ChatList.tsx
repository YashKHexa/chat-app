import React from 'react'
import { Empty } from 'antd'
import ChatCard from './ChatCard'
import { useChatStore } from '@/store/chatStore'

const ChatList: React.FC = () => {
  const users = useChatStore((s) => s.users)
  const selectedUserId = useChatStore((s) => s.selectedUserId)
  const selectUser = useChatStore((s) => s.selectUser)
  const search = useChatStore((s) => s.search.trim().toLowerCase())
  const visibleUsers = users.filter((u) => u.name.toLowerCase().includes(search))

  if (visibleUsers.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No users online" />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-1.5">
      {visibleUsers.map((user) => (
        <ChatCard
          key={user.id}
          name={user.name}
          subtitle="Online"
          active={user.id === selectedUserId}
          onClick={() => selectUser(user.id)}
        />
      ))}
    </div>
  )
}

export default ChatList
