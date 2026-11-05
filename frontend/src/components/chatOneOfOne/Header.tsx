import React from 'react'
import Avatar from '../common/Avatar'
import NameAndTitle from '../common/NameAndTitle'
import { ThemeSwitcher } from '../../themeprovide/ThemeSwitcher'
import { useChat } from '@/context/ChatContext'

const Header: React.FC = () => {
  const { activeConversation } = useChat()

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border box-border min-h-[74px]">
      <div className="flex items-center gap-3">
        {activeConversation ? (
          <>
            <Avatar
              text={activeConversation.avatarText}
              bg={activeConversation.avatarBg}
              color={activeConversation.avatarColor}
              size={42}
            />
            <NameAndTitle
              name={activeConversation.name}
              showStatus
            />
          </>
        ) : (
          <span className="text-font-secondary text-[15px] font-medium">
            Chat
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <ThemeSwitcher />
      </div>
    </div>
  )
}

export default Header
