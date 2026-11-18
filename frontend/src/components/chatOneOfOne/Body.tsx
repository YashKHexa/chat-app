import React, { useRef, useEffect } from 'react'
import { Empty } from 'antd'
import { useChatStore } from '@/store/chatStore'

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const Body: React.FC<{ userId: string }> = ({ userId }) => {
  const allMessages = useChatStore((s) => s.messages)
  const myId = useChatStore((s) => s.myId)
  const endRef = useRef<HTMLDivElement>(null)

  const messages = allMessages.filter(
    (m) =>
      (m.senderId === myId && m.receiverId === userId) ||
      (m.senderId === userId && m.receiverId === myId),
  )

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, userId])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No messages yet" />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-4.5">
      {messages.map((msg) => {
        const isOutgoing = msg.senderId === myId

        return (
          <div key={msg.id} className={`flex flex-col ${isOutgoing ? 'items-end' : 'items-start'}`}>
            <div
              className={`max-w-[65%] px-4.5 py-3 rounded-2xl text-[14.5px] leading-relaxed break-words ${
                isOutgoing
                  ? 'bg-primary text-on-brand'
                  : 'bg-background-secondary text-font border border-border'
              }`}
            >
              {msg.text}
            </div>

            <div className="text-[11px] text-font-tertiary mt-1 px-1">
              {formatTime(msg.createdAt)}
            </div>
          </div>
        )
      })}
      <div ref={endRef} />
    </div>
  )
}

export default Body
