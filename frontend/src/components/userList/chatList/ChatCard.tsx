import React from 'react'
import { Badge } from 'antd'
import Avatar from '../../common/Avatar'
import NameAndTitle from '../../common/NameAndTitle'
import type { Conversation } from '../../../types/types'

interface ChatCardProps {
  conversation: Conversation
  isActive: boolean
  onClick: () => void
}

const ChatCard: React.FC<ChatCardProps> = ({
  conversation,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-3.5 py-3 rounded-2xl cursor-pointer transition-colors duration-200 ${
        isActive
          ? 'bg-card-active'
          : 'bg-transparent hover:bg-background-secondary'
      }`}
    >
      <Avatar
        text={conversation.avatarText}
        bg={conversation.avatarBg}
        color={conversation.avatarColor}
        size={46}
        className="mr-3.5"
      />

      <NameAndTitle
        name={conversation.name}
        title={conversation.lastMessage}
        time={conversation.time}
      />

      {conversation.unreadCount && conversation.unreadCount > 0 ? (
        <Badge
          count={conversation.unreadCount}
          className="ml-1.5 [&_.ant-badge-count]:!bg-primary [&_.ant-badge-count]:!text-on-brand [&_.ant-badge-count]:!text-[11px] [&_.ant-badge-count]:!font-semibold [&_.ant-badge-count]:!h-5 [&_.ant-badge-count]:!min-w-5 [&_.ant-badge-count]:!leading-5 [&_.ant-badge-count]:!rounded-full [&_.ant-badge-count]:!shadow-none [&_.ant-badge-count]:!px-1.5"
        />
      ) : null}
    </div>
  )
}

export default ChatCard
