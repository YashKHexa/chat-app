import React from 'react'
import Avatar from '../../common/Avatar'
import NameAndTitle from '../../common/NameAndTitle'

interface ChatCardProps {
  name: string
  subtitle: string
  active: boolean
  onClick: () => void
}

const ChatCard: React.FC<ChatCardProps> = ({ name, subtitle, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center px-3.5 py-3 rounded-2xl cursor-pointer transition-colors duration-200 ${
      active ? 'bg-card-active' : 'hover:bg-background-secondary'
    }`}
  >
    <Avatar name={name} className="mr-3.5" />
    <NameAndTitle name={name} title={subtitle} />
  </div>
)

export default ChatCard
