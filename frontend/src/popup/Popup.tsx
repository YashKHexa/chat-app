import React, { useState, useEffect, useRef } from 'react'
import { Modal, Input, Button } from 'antd'
import type { Socket } from 'socket.io-client'
import { connectsocket } from '@/services/socket'

interface PopupProps {
  open?: boolean
  onContinue?: (name: string) => void
  onCancel?: () => void
}

export const Popup: React.FC<PopupProps> = ({
  open: propOpen,
  onContinue,
  onCancel,
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const [name, setName] = useState(() => localStorage.getItem('chat_username') || '')

  const socket = useRef<Socket | null>(null)

  useEffect(() => {
    socket.current = connectsocket()

    return () => {
      socket.current?.disconnect()
    }
  }, [])

  useEffect(() => {
    const handleOpenPopup = () => {
      setName(localStorage.getItem('chat_username') || '')
      setIsOpen(true)
    }
    window.addEventListener('open-name-popup', handleOpenPopup)
    return () => {
      window.removeEventListener('open-name-popup', handleOpenPopup)
    }
  }, [])

  const isModalOpen = propOpen !== undefined ? propOpen : isOpen
  const hasExistingName = Boolean(localStorage.getItem('chat_username'))

  const handleContinue = () => {
    if (!name.trim()) return
    const trimmed = name.trim()
    localStorage.setItem('chat_username', trimmed)
    window.dispatchEvent(new Event('chat-user-change'))
    setIsOpen(false)
    onContinue?.(trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleContinue()
    }
  }

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => {
        setIsOpen(false)
        onCancel?.()
      }}
      footer={null}
      closable={hasExistingName}
      maskClosable={hasExistingName}
      keyboard={hasExistingName}
      centered
      width={460}
      className="[&_.ant-modal-content]:!rounded-[20px] [&_.ant-modal-content]:!p-6 [&_.ant-modal-content]:!bg-modal-bg [&_.ant-modal-content]:!border [&_.ant-modal-content]:!border-border"
    >
      <div>
        {/* Title */}
        <h2 className="m-0 mb-2 text-xl font-bold text-font tracking-[-0.2px]">
          Enter your name
        </h2>

        {/* Subtitle / Description */}
        <p className="m-0 mb-5 text-[13.5px] text-font-secondary leading-relaxed">
          Enter your name to start chatting. This will be used to identify
        </p>

        {/* Input */}
        <div className="mb-5">
          <Input
            placeholder="Your name (e.g. John Doe)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="!h-[46px] !rounded-xl !text-[14.5px] !border-modal-input-border !bg-modal-input !text-font placeholder:!text-font-tertiary focus:!border-modal-input-border"
          />
        </div>

        {/* Footer / Continue button */}
        <div className="flex justify-end">
          <Button
            type="primary"
            onClick={handleContinue}
            className="!bg-primary hover:!bg-primary-hover !border-transparent !rounded-full !h-10 !px-7 !text-sm !font-semibold !text-on-brand shadow-sm"
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default Popup
