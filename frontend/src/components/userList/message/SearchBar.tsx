import React from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useChat } from '@/context/ChatContext'

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useChat()

  return (
    <div className="mb-5">
      <Input
        prefix={<SearchOutlined className="text-font-tertiary text-base mr-1.5" />}
        placeholder="Search messages"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        allowClear
        className="chat-search-input !rounded-[14px] !px-3.5 !py-2 !bg-background-secondary !border-border !text-font [&_input]:!bg-transparent [&_input]:!text-font [&_input]:placeholder:!text-font-tertiary shadow-none"
      />
    </div>
  )
}

export default SearchBar
