import React from 'react'
import InputMessage from './InputMessage'
import { BotMessageSquare } from 'lucide-react'
import Message from './Message/Message'

export default function MessageList() {
  return (
    <div className='flex flex-col h-full'>
      <div className='rounded-tl-lg bg-white sticky top-0 z-10 flex gap-2 items-center border-b p-1 border-gray-400'>
        <span className='font-bold text-2xl'>User</span>
      </div>

      <div className='flex-1 overflow-y-auto p-2'>
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index}>
            <Message />
          </div>
        ))}
      </div>
      <div className='bg-white p-2 '>
        <InputMessage />
      </div>
    </div>
  )
}
