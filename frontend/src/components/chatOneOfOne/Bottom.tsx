import React, { useState } from 'react'
import { Input, Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useChat } from '@/context/ChatContext'

const Bottom: React.FC = () => {
  const { sendMessage, activeConversation } = useChat()
  const [inputText, setInputText] = useState('')

  const handleSend = () => {
    if (!inputText.trim() || !activeConversation) return
    sendMessage(inputText.trim())
    setInputText('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="px-6 pt-4 pb-5 border-t border-border">
      <div className="flex items-center bg-background-secondary rounded-full py-1 pl-4 pr-1.5 border border-border">
        <Input
          variant="borderless"
          placeholder={activeConversation ? 'Write a message' : 'Select a conversation to start messaging'}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!activeConversation}
          className="chat-message-input flex-1 text-sm text-font placeholder:!text-font-tertiary [&_input]:!text-font [&_input]:placeholder:!text-font-tertiary"
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined className="text-sm" />}
          onClick={handleSend}
          disabled={!inputText.trim() || !activeConversation}
          className={`!w-9 !h-9 flex items-center justify-center !border-transparent transition-colors ${
            inputText.trim() && activeConversation
              ? '!bg-primary hover:!bg-primary-hover !text-on-brand'
              : '!bg-btn-disabled !text-on-brand'
          }`}
        />
      </div>
    </div>
  )
}

export default Bottom
