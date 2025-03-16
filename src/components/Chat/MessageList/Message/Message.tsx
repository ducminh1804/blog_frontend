import React, { memo } from 'react'
import type { MessageType } from '../../../../types/message.type'

interface Props {
  message: MessageType
}
const Message = memo(({ message }: Props) => {
  const { content, createAt, id, recipentId, senderId } = message
  return (
    <div className='flex gap-2 items-start my-3'>
      <div>
        <img
          className='w-8 h-8 object-cover rounded-full border'
          src='https://preview.redd.it/snoovatar/avatars/ff5b73a1-e7c5-44bd-8de7-757621afc799-headshot.png?width=64&height=64&crop=smart&auto=webp&s=7799a30d40c46085e35675dbfc616113132b2f33'
          alt=''
        />
      </div>
      <div className='flex-1 min-w-0'>
        <div>
          <span className='font-bold text-[13px] font-sans'>{senderId}</span>
        </div>
        <div className='w-fit'>
          <p className='bg-blue-300 break-words font-thin text-[13px] p-2 rounded-lg pr-5'>{content}</p>
          <span>{createAt}</span>
        </div>
      </div>
    </div>
  )
})
export default Message
