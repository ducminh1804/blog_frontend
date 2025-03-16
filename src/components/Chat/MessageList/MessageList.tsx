import { memo, useEffect, useRef, useState } from 'react'
import type { MessageType } from '../../../types/message.type'
import InputMessage from './InputMessage'
import Message from './Message/Message'

interface Props {
  messages: MessageType[]
  curRef: React.MutableRefObject<HTMLDivElement | null>
}

const MessageList = memo(({ messages, curRef }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const prevScrollHeightRef = useRef(0)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  })

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight - prevScrollHeightRef.current
      prevScrollHeightRef.current = containerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className='flex flex-col h-full'>
      <div className='rounded-tl-lg bg-white sticky top-0 z-10 flex gap-2 items-center border-b p-1 border-gray-400'>
        <span className='font-bold text-2xl'>User</span>
      </div>
      <div ref={containerRef} className='flex-1 overflow-y-auto p-2'>
        {messages.map((item, index) => {
          const isFirstMsg = index === 0
          return (
            <div key={item.id} ref={isFirstMsg ? curRef : null}>
              <span>{item.id}</span>
              <Message message={item} />
            </div>
          )
        })}
      </div>
      <div className='bg-white p-2 '>
        <InputMessage />
      </div>
    </div>
  )
})

export default MessageList
