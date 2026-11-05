import React from 'react'
import { useChat } from '@/context/ChatContext'

interface NameAndTitleProps {
  name?: string
  title?: string
  time?: string
  showStatus?: boolean
  className?: string
}

const NameAndTitle: React.FC<NameAndTitleProps> = ({
  name,
  title,
  time,
  showStatus = false,
  className = '',
}) => {
  const { currentUserName } = useChat()

  const displayName =
    name && name !== 'currentUser'
      ? name
      : currentUserName || localStorage.getItem('chat_username') || 'User'

  if (showStatus) {
    return (
      <div className={`min-w-0 ${className}`}>
        <div className="text-[15px] font-semibold text-font leading-tight">
          {displayName}
        </div>
        {title && (
          <div className="text-xs text-font-secondary mt-[3px]">
            {title}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`flex-1 min-w-0 ${className}`}>
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-[15px] font-semibold text-font truncate">
          {displayName}
        </span>
        {time && (
          <span className="text-xs text-font-tertiary ml-2 shrink-0">
            {time}
          </span>
        )}
      </div>

      {title && (
        <span className="text-[13px] text-font-secondary truncate block pr-1.5">
          {title}
        </span>
      )}
    </div>
  )
}

export default NameAndTitle
