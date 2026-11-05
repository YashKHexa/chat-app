import React from 'react'
import { Avatar as AntdAvatar, type AvatarProps as AntdAvatarProps } from 'antd'

interface AvatarProps extends AntdAvatarProps {
  text?: string
  bg?: string
  color?: string
}

const Avatar: React.FC<AvatarProps> = ({
  text,
  children,
  size = 46,
  className = '',
  bg: _bg,
  color: _color,
  ...props
}) => {
  return (
    <AntdAvatar
      size={size}
      className={`font-semibold shrink-0 bg-avatar-bg text-avatar-text ${className}`}
      {...props}
    >
      {text || children || 'U'}
    </AntdAvatar>
  )
}

export default Avatar
