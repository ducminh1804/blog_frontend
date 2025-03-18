import React, { memo } from 'react'
import type { MessageType } from '../../../../types/message.type'
import { useAppSelector } from '../../../../redux/hooks'

interface Props {
  message: MessageType
}

const Message = memo(({ message }: Props) => {
  const { content, createAt, senderId } = message
  const isMe = useAppSelector((state) => state.auth.id) === senderId

  return isMe ? (
    <div className='flex justify-end my-3'>
      <div className='flex gap-2 flex-row-reverse items-start max-w-xs'>
        <div>
          <img
            className='w-8 h-8 object-cover rounded-full border'
            src='https://preview.redd.it/snoovatar/avatars/ff5b73a1-e7c5-44bd-8de7-757621afc799-headshot.png?width=64&height=64&crop=smart&auto=webp&s=7799a30d40c46085e35675dbfc616113132b2f33'
            alt=''
          />
        </div>
        <div className='text-right'>
          <div>
            <span className='font-bold text-[13px] font-sans'>{senderId}</span>
          </div>
          <div>
            <p className='max-w-xs bg-blue-500 text-white break-words font-thin text-[13px] p-2 rounded-lg inline-block'>
              {content}
            </p>
            <div>
              <span className='text-[11px] text-gray-400'>{createAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex gap-2 items-start my-3 max-w-xs'>
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
        <div className='inline-block'>
          <p className='max-w-xs inline-block bg-gray-200 break-words font-thin text-[13px] p-2 rounded-lg'>{content}</p>
          <div>
            <span className='text-[11px] text-gray-500'>{createAt}</span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Message
