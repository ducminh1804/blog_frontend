import { memo, useEffect, useRef, useState } from 'react'
import type { MessageType } from '../../../types/message.type'
import InputMessage from './InputMessage'
import Message from './Message/Message'

interface Props {
  messages: MessageType[]
  curRef: React.MutableRefObject<HTMLDivElement | null>
  chanel: string
  isLoading: boolean
}

const MessageList = memo(({ messages, curRef, chanel, isLoading }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const prevScrollHeightRef = useRef(0)
  const prevChanelRef = useRef('')
  const initialScrollDoneRef = useRef(false)
  const lastMessageIdRef = useRef('')
  // Cuộn xuống dưới cùng khi component mount lần đầu
  useEffect(() => {
    if (containerRef.current && !initialScrollDoneRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
      initialScrollDoneRef.current = true
    }
  }, [])

  // Xử lý scroll khi messages thay đổi
  useEffect(() => {
    if (!containerRef.current || messages.length === 0) return
    const container = containerRef.current

    // Kiểm tra xem người dùng đang ở gần cuối hay không
    const isNearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 80

    const lastMessage = messages.at(-1) as MessageType
    const newLastMessageId = lastMessage.id
    const oldLastMessageId = lastMessageIdRef.current

    // Nếu chuyển kênh hoặc người dùng ở gần cuối, scroll xuống dưới cùng
    if (prevChanelRef.current !== chanel) {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
      })
    } else if (isNearBottom || newLastMessageId !== oldLastMessageId) {
      // Nếu người dùng đang ở gần cuối, scroll xuống dưới cùng
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
      })
    } else if (newLastMessageId == oldLastMessageId) {
      // Giữ nguyên vị trí scroll tương đối
      const newScrollTop = containerRef.current.scrollHeight - prevScrollHeightRef.current
      if (newScrollTop > 0) {
        containerRef.current.scrollTop = newScrollTop
      }
    }

    // Cập nhật chiều cao trước đó
    lastMessageIdRef.current = newLastMessageId
    prevScrollHeightRef.current = container.scrollHeight
    prevScrollHeightRef.current = containerRef.current.scrollHeight
  }, [messages, chanel])

  // Xử lý khi đổi kênh
  useEffect(() => {
    // Nếu kênh thay đổi, cập nhật ref và reset scrollHeight
    if (prevChanelRef.current !== chanel) {
      prevChanelRef.current = chanel
      prevScrollHeightRef.current = 0

      // Scroll xuống dưới cùng khi chuyển kênh sau khi DOM cập nhật
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
      }, 0)
    }
  }, [chanel])

  return (
    <div className='flex flex-col h-full'>
      <div className='rounded-tl-lg bg-white sticky top-0 z-10 flex gap-2 items-center border-b p-1 border-gray-400'>
        <span className='font-bold text-2xl'>{chanel || 'Chọn một kênh'}</span>
      </div>

      <div ref={containerRef} className='flex-1 overflow-y-auto p-2'>
        {isLoading ? (
          <div className='flex items-center justify-center h-full'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
          </div>
        ) : messages.length === 0 ? (
          <div className='flex items-center justify-center h-full text-gray-500'>
            {chanel ? 'Chưa có tin nhắn nào' : 'Vui lòng chọn một kênh để xem tin nhắn'}
          </div>
        ) : (
          messages.map((item, index) => {
            const isFirstMsg = index === 0
            return (
              <div key={item.id} ref={isFirstMsg ? curRef : null}>
                <Message message={item} />
              </div>
            )
          })
        )}
      </div>

      <div className='bg-white p-2'>
        <InputMessage chanel={chanel} />
      </div>
    </div>
  )
})

export default MessageList
