import React, { type FormEvent } from 'react'
import { Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useChatStore } from '@/store/chatStore'

const Bottom: React.FC = () => {
  const sendMessage = useChatStore((s) => s.sendMessage)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const text = String(new FormData(form).get('text')).trim()
    if (!text) return
    sendMessage(text)
    form.reset()
  }

  return (
    <div className="px-6 pt-4 pb-5 border-t border-border">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-background-secondary rounded-full py-1 pl-4 pr-1.5 border border-border"
      >
        <input
          name="text"
          maxLength={2000}
          autoComplete="off"
          placeholder="Write a message"
          className="flex-1 bg-transparent outline-none text-sm text-font placeholder:text-font-tertiary"
        />
        <Button
          type="primary"
          shape="circle"
          htmlType="submit"
          icon={<SendOutlined className="text-sm" />}
          className="!w-9 !h-9 flex items-center justify-center !border-transparent !bg-primary hover:!bg-primary-hover !text-on-brand"
        />
      </form>
    </div>
  )
}

export default Bottom
