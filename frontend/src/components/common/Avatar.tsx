import React from 'react'
import { useChat } from '@/context/ChatContext'

interface AvatarProps {
  text?: string
  size?: number | 'large' | 'small' | 'default'
  bg?: string
  color?: string
  gap?: number
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({
  text,
  size = 46,
  className = '',
}) => {
  const { currentUserName } = useChat()

  const displayText =
    text ||
    (currentUserName
      ? currentUserName.slice(0, 2).toUpperCase()
      : localStorage.getItem('chat_username')?.slice(0, 2).toUpperCase() || 'U')

  const isLarge = typeof size === 'number' ? size >= 44 : size === 'large'

  return (
    <div
      className={`rounded-full flex items-center justify-center font-semibold shrink-0 select-none bg-avatar-bg text-avatar-text ${
        isLarge ? 'w-[46px] h-[46px] text-[15px]' : 'w-[42px] h-[42px] text-[13px]'
      } ${className}`}
    >
      {displayText}
    </div>
  )
}

export default Avatar
