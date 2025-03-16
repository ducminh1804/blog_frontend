import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import ChatLayout from '../../layouts/ChatLayout'
import classNames from 'classnames'

export default function ChatController() {
  const activeChat = useAppSelector((state) => state.chat.active)

  return (
    <div>
      <div
        className={classNames({
          'visible opacity-100  transition-all': activeChat,
          'invisible opacity-0 transition-all': !activeChat
        })}
      >
        <ChatLayout />
      </div>
    </div>
  )
}
