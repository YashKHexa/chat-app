import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'

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
  const [name, setName] = useState('')  // refresh pe blank

  useEffect(() => {
    const handleOpenPopup = () => {
      setName('')  // open-name-popup event pe bhi blank
      setIsOpen(true)
    }
    window.addEventListener('open-name-popup', handleOpenPopup)
    return () => window.removeEventListener('open-name-popup', handleOpenPopup)
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
    if (e.key === 'Enter') handleContinue()
  }

  if (!isModalOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.4)' }}
      onClick={hasExistingName ? () => { setIsOpen(false); onCancel?.() } : undefined}
    >
      <div
        className="relative w-[460px] rounded-[20px] p-6 border border-border bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        {hasExistingName && (
          <button
            onClick={() => { setIsOpen(false); onCancel?.() }}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-font-secondary hover:bg-background-secondary transition-colors text-lg leading-none"
          >
            ×
          </button>
        )}

        <h2 className="m-0 mb-2 text-xl font-bold text-font tracking-[-0.2px]">
          Enter your name
        </h2>

        <p className="m-0 mb-5 text-[13.5px] text-font-secondary leading-relaxed">
          Enter your name to start chatting. This will be used to identify you.
        </p>

        <div className="mb-5">
          <Input
            placeholder="Your name (e.g. John Doe)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="!h-[46px] !rounded-xl !text-[14.5px] !border-modal-input-border !bg-background-secondary !text-font placeholder:!text-font-tertiary focus:!border-modal-input-border !shadow-none"
          />
        </div>

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
    </div>
  )
}

export default Popup
