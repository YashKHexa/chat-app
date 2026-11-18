import React from 'react'
import Avatar from '../common/Avatar'
import NameAndTitle from '../common/NameAndTitle'
import { ThemeSwitcher } from '../../themeprovide/ThemeSwitcher'
import type { User } from '@/store/chatStore'

const Header: React.FC<{ user?: User }> = ({ user }) => (
  <div className="flex items-center justify-between px-6 py-4 border-b border-border box-border min-h-[74px]">
    <div className="flex items-center gap-3">
      {user && (
        <>
          <Avatar name={user.name} size={42} />
          <NameAndTitle name={user.name} title="Online" showStatus />
        </>
      )}
    </div>

    <ThemeSwitcher />
  </div>
)

export default Header
