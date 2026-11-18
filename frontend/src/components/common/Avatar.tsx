import React from 'react'
import { Avatar as AntdAvatar } from 'antd'

interface AvatarProps {
  name: string
  size?: number
  className?: string
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const Avatar: React.FC<AvatarProps> = ({ name, size = 46, className = '' }) => (
  <AntdAvatar size={size} className={`font-semibold shrink-0 bg-avatar-bg text-avatar-text ${className}`}>
    {initials(name)}
  </AntdAvatar>
)

export default Avatar
