import React from 'react'
import Message from './message/Message'
import SearchBar from './message/SearchBar'
import ChatList from './chatList/ChatList'
import { useChatStore } from '@/store/chatStore'

const UserList: React.FC = () => {
  const selectedUserId = useChatStore((s) => s.selectedUserId)

  return (
    <div
      className={`flex-col h-full w-full md:w-[300px] lg:w-[360px] shrink-0 p-3 md:p-4 lg:p-5 box-border bg-background ${
        selectedUserId ? 'hidden md:flex' : 'flex'
      }`}
    >
      <Message />
      <SearchBar />
      <ChatList />
    </div>
  )
}

export default UserList
