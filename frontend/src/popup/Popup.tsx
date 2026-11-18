import React, { type FormEvent } from 'react'
import { Input, Button } from 'antd'
import { useChatStore } from '@/store/chatStore'

const Popup: React.FC = () => {
  const userName = useChatStore((s) => s.userName)
  const join = useChatStore((s) => s.join)

  if (userName) return null

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = String(new FormData(e.currentTarget).get('name')).trim()
    if (name) join(name)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="relative w-[460px] rounded-[20px] p-6 border border-border bg-background shadow-2xl"
      >
        <h2 className="m-0 mb-2 text-xl font-bold text-font tracking-[-0.2px]">
          Enter your name
        </h2>

        <p className="m-0 mb-5 text-[13.5px] text-font-secondary leading-relaxed">
          Enter your name to start chatting. This will be used to identify you.
        </p>

        <div className="mb-5">
          <Input
            name="name"
            maxLength={50}
            placeholder="Your name (e.g. John Doe)"
            autoFocus
            className="!h-[46px] !rounded-xl !text-[14.5px] !border-modal-input-border !bg-background-secondary !text-font placeholder:!text-font-tertiary focus:!border-modal-input-border !shadow-none"
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            className="!bg-primary hover:!bg-primary-hover !border-transparent !rounded-full !h-10 !px-7 !text-sm !font-semibold !text-on-brand shadow-sm"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Popup
