import React from 'react'
import Header from './Header'
import Bottom from './Bottom'
import Body from './Body'

const ChatOneOfOne: React.FC = () => {
  return (
    <div className="flex flex-col h-full flex-1 min-w-0 bg-background">
      <Header />
      <Body />
      <Bottom />
    </div>
  )
}

export default ChatOneOfOne
