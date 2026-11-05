import React from 'react'
import { Typography } from 'antd'

const { Text } = Typography

interface NameAndTitleProps {
  name?: string
  title?: string
  time?: string
  showStatus?: boolean
  className?: string
}

const NameAndTitle: React.FC<NameAndTitleProps> = ({
  name = 'User',
  title,
  time,
  showStatus = false,
  className = '',
}) => {
  if (showStatus) {
    return (
      <div className={`min-w-0 ${className}`}>
        <Text strong className="block text-[15px] !text-font leading-tight">
          {name}
        </Text>
        {title && (
          <Text type="secondary" className="block text-xs !text-font-secondary mt-[3px]">
            {title}
          </Text>
        )}
      </div>
    )
  }

  return (
    <div className={`flex-1 min-w-0 ${className}`}>
      <div className="flex justify-between items-baseline mb-1">
        <Text strong ellipsis className="text-[15px] !text-font">
          {name}
        </Text>
        {time && (
          <Text type="secondary" className="text-xs !text-font-tertiary ml-2 shrink-0">
            {time}
          </Text>
        )}
      </div>

      {title && (
        <Text type="secondary" ellipsis className="text-[13px] !text-font-secondary block pr-1.5">
          {title}
        </Text>
      )}
    </div>
  )
}

export default NameAndTitle
