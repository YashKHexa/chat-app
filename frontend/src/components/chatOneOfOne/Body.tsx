import React, { useRef, useEffect } from 'react'
import { Empty } from 'antd'
import { useChat, type MessageItem } from '@/context/ChatContext'

const Body: React.FC = () => {
  const { messages } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            activeConversation
              ? "No messages yet in this conversation"
              : "No conversation selected"
          }
        />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-4.5">
      {messages.map((msg: MessageItem) => (
        <div
          key={msg.id}
          className={`flex flex-col ${msg.isOutgoing ? 'items-end' : 'items-start'}`}
        >
          {/* Sender Name (agar doosre user ka message ho) */}
          {!msg.isOutgoing && (
            <div className="text-[11px] font-semibold text-primary mb-1 px-1">
              {msg.sender}
            </div>
          )}

          {/* Bubble */}
          <div
            className={`max-w-[65%] px-4.5 py-3 rounded-2xl text-[14.5px] leading-relaxed break-words ${
              msg.isOutgoing
                ? 'bg-primary text-on-brand'
                : 'bg-background-secondary text-font border border-border'
            }`}
          >
            {msg.text}
          </div>

          {/* Timestamp */}
          <div className="text-[11px] text-font-tertiary mt-1 px-1">
            {msg.time}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Body
