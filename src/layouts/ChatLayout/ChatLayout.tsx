import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import ChanelList from '../../components/Chat/ChanelList'
import MessageList from '../../components/Chat/MessageList'
import './style.css'
import { FollowAPI } from '../../api/follow.api'
import { memo, useEffect, useRef, useState } from 'react'
import { MessageAPI } from '../../api/message.api'
import { useAppSelector } from '../../redux/hooks'
import { useStomp } from '../../hooks/useStomp'
import type { MessageType, msgType } from '../../types/message.type'
import { toMessageType } from '../../utils/toMessageType'

const ChatLayout = memo(() => {
  const userId = useAppSelector((state) => state.auth.id)
  const [chanel, setChanel] = useState('')
  const [prevChanel, setPrevChanel] = useState('')
  const queryClient = useQueryClient()

  const followQuery = useQuery({
    queryKey: ['follow'],
    queryFn: () => FollowAPI.getAll(),
    refetchOnWindowFocus: false
  })

  const data = followQuery.data?.data.data || []
  const messagesQuery = useInfiniteQuery({
    queryKey: ['message', userId, chanel],
    queryFn: ({ pageParam }) => MessageAPI.getMsg(userId, chanel, pageParam),
    initialPageParam: new Date().toISOString(),
    getNextPageParam: (lastPage, pages) => lastPage.data.data.at(-1)?.createAt,
    refetchOnWindowFocus: false,
    enabled: !!chanel // Chỉ fetch khi có chanel
  })

  const messagesRoot = messagesQuery.data?.pages.flatMap((message) => message.data.data) || []
  const messages = [...messagesRoot].reverse()
  const msgRef = useRef(null)

  // Xử lý infinite scroll
  useEffect(() => {
    if (!msgRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && messagesQuery.hasNextPage) {
            messagesQuery.fetchNextPage()
          }
        })
      },
      {
        threshold: 1
      }
    )
    observer.observe(msgRef.current)
    return () => observer.disconnect()
  }, [messagesQuery.isFetching])

  // Xử lý khi đổi kênh chat
  useEffect(() => {
    if (chanel !== prevChanel) {
      setPrevChanel(chanel)

      if (chanel) {
        queryClient.resetQueries({ queryKey: ['message', userId, chanel] })
      }
    }
  }, [chanel, queryClient, userId, prevChanel])

  const { msg, connected } = useStomp('/user/queue/messages')

  // Xử lý khi có tin nhắn mới từ WebSocket
  useEffect(() => {
    if (!msg) return

    const newMsg = toMessageType(msg as msgType, chanel)
    console.log('Tin nhắn mới nhận được:', newMsg)

    // Kiểm tra xem tin nhắn mới có thuộc về kênh hiện tại không
    if (newMsg.senderId === chanel) {
      console.log('â')
      // Thêm tin nhắn mới vào cache của React Query,
      // đảm bảo tạo bản sao mới (không mutate đối tượng cũ)
      queryClient.setQueryData(['message', userId, chanel], (oldData: any) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          pages: [
            {
              ...oldData.pages[0],
              data: {
                ...oldData.pages[0].data,
                data: [newMsg, ...oldData.pages[0].data.data]
              }
            },
            ...oldData.pages.slice(1)
          ]
        }
      })
    }
  }, [msg, chanel, queryClient, userId])
  // Hàm xử lý chuyển kênh
  const handleSetChanel = (newChanel: string) => {
    setChanel(newChanel)
  }

  return (
    <div className='fixed bottom-0 right-0 z-50'>
      <div className='bg-white flex border border-gray-700 border-b-0 rounded-t-lg w-[700px] h-[500px]'>
        <div className='flex-1 border-r-2 border-r-gray-400 overflow-y-auto'>
          <ChanelList follows={data} onSetChanel={handleSetChanel} />
        </div>
        <div className='hide-scrollbar flex-[2] overflow-y-auto'>
          <MessageList messages={messages} curRef={msgRef} chanel={chanel} isLoading={messagesQuery.isLoading} />
        </div>
      </div>
    </div>
  )
})

export default ChatLayout
