import React from 'react'
import { Empty } from 'antd'
import Header from './Header'
import Bottom from './Bottom'
import Body from './Body'
import { useChatStore } from '@/store/chatStore'

const ChatOneOfOne: React.FC = () => {
  const selectedUser = useChatStore((s) => s.users.find((u) => u.id === s.selectedUserId))
  const selectedUserId = useChatStore((s) => s.selectedUserId)

  return (
    <div
      className={`flex-col h-full flex-1 min-w-0 bg-background ${
        selectedUserId ? 'flex' : 'hidden md:flex'
      }`}
    >
      <Header user={selectedUser} />
      {selectedUser ? (
        <>
          <Body userId={selectedUser.id} />
          <Bottom />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center p-3 md:p-5 lg:p-6">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Select a user to start chatting" />
        </div>
      )}
    </div>
  )
}

export default ChatOneOfOne
