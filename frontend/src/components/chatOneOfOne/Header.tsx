import React from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import Avatar from '../common/Avatar'
import NameAndTitle from '../common/NameAndTitle'
import { ThemeSwitcher } from '../../themeprovide/ThemeSwitcher'
import { useChatStore, type User } from '@/store/chatStore'

const Header: React.FC<{ user?: User }> = ({ user }) => {
  const selectUser = useChatStore((s) => s.selectUser)

  return (
    <div className="flex items-center justify-between px-3 md:px-5 lg:px-6 py-2.5 md:py-3.5 lg:py-4 border-b border-border box-border min-h-[58px] md:min-h-[68px] lg:min-h-[74px]">
      <div className="flex items-center gap-2 md:gap-2.5 lg:gap-3">
        {user && (
          <>
            <button
              type="button"
              onClick={() => selectUser()}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-background-secondary text-font cursor-pointer border-none bg-transparent mr-1"
              aria-label="Back"
            >
              <AiOutlineLeft className="text-lg" />
            </button>
            <Avatar name={user.name} size={42} />
            <NameAndTitle name={user.name} title="Online" showStatus />
          </>
        )}
      </div>

      <ThemeSwitcher />
    </div>
  )
}

export default Header
