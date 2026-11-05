import React from 'react'
import Message from './message/Message'
import SearchBar from './message/SearchBar'
import ChatList from './chatList/ChatList'

const UserList: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-[360px] shrink-0 p-5 box-border bg-background">
      <Message />
      <SearchBar />
      <ChatList />
    </div>
  )
}

export default UserList
