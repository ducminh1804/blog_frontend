import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import ChanelList from '../../components/Chat/ChanelList'
import MessageList from '../../components/Chat/MessageList'
import './style.css'
import { FollowAPI } from '../../api/follow.api'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { MessageAPI } from '../../api/message.api'
import { useAppSelector } from '../../redux/hooks'

const ChatLayout = () => {
  const userId = useAppSelector((state) => state.auth.id)
  const [chanel, setChanel] = useState('')
  const followQuery = useQuery({
    queryKey: ['follow'],
    queryFn: () => FollowAPI.getAll(),
    refetchOnWindowFocus: false
  })

  const data = followQuery.data?.data.data || []
  const messagesQuery = useInfiniteQuery({
    queryKey: ['message', userId, chanel],
    queryFn: ({ pageParam }) => MessageAPI.getMsg(userId, '4b8985f7-cbb4-4789-973d-c6e65841b6ff', pageParam),
    initialPageParam: new Date().toISOString(),
    getNextPageParam: (lastPage, pages) => lastPage.data.data.at(-1)?.createAt,
    refetchOnWindowFocus: false
  })

  const messagesRoot = messagesQuery.data?.pages.flatMap((message) => message.data.data) || []
  const messages = [...messagesRoot].reverse()
  // tao useRef
  const msgRef = useRef(null)
  //khoi tao theo doi intersection thoe doi lastpostref
  //can useEffect, bat dependency fetching, vi moi khi viewport phat hien, no se tu dong fetchAPI,
  //lam fetching thay doi , luc do se thay doi gia tri lastpostref

  useEffect(() => {
    //lan dau useEffect chay
    if (!msgRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('🔍 Intersection Observer:', entry.isIntersecting)

          if (entry.isIntersecting) {
            messagesQuery.fetchNextPage()
            // setFetch(false)
          }
        })
      },
      {
        threshold: 1
      }
    )
    //dang ki observer
    observer.observe(msgRef.current)
    return () => observer.disconnect()
  }, [messagesQuery.isFetching])

  useEffect(() => {
    console.log('🆔 Query Key:', ['message', userId, chanel])
  }, [userId, chanel])

  return (
    <div className='fixed bottom-0 right-0 z-50'>
      <div className='bg-white flex border border-gray-700 border-b-0  rounded-t-lg w-[700px] h-[500px]'>
        <div className='flex-1 border-r-2 border-r-gray-400 overflow-y-auto '>
          <ChanelList follows={data} onSetChanel={setChanel} />
        </div>
        <div className='hide-scrollbar flex-[2] overflow-y-auto'>
          <MessageList messages={messages} curRef={msgRef} />
        </div>
      </div>
    </div>
  )
}
export default ChatLayout
/*
li do check null o dong 38, lan sau component mount len, chi la cay dom rong,k co du lieu,
Component mount: Component của bạn được render lần đầu tiên.

useQuery fetching: useQuery bắt đầu quá trình fetching dữ liệu.

DOM Update: Component được mount và cập nhật trên DOM.

useEffect chạy: useEffect được gọi sau khi component đã render xong.

ở đây, mặc dù usequery chạy trc nhưng post chưa có trả về liền nên có thể là rỗng, trong lúc đó
useEffect chạy và phát hiện current vẫn là null nên lỗi,
ngay sau khi posts dc trả về sẽ cập nhật data, và data hay bất kì thuocj tính nào do usequery quản lí 
mà có thay đổi sẽ làm cpn render lại, thế là ta có useEffect được gọi tiếp
*/

/** gan ref cho phan tu tren cung cua tin nhan
 * - khi luot len tren cung o ti le viewport 0.2 => load len
 * => biet dc khi nao vi tri phan tu tren cung nam trong viewport
 * => phai gan ref cho no roi theo doi
 * => xac dinh phan tu dau tien cua list msg dau tien dc tra ve=> no chinh la ref
 */

/**
 * nen dat ref nay o trong layout hay listmsg,
 * neu trong layout, khi scroll, query se goi lai va tao data moi=> khien cho layout component
 * nay bi render,
 * neu dat trong messagelist, chi co messagelist bi render va msg render
 * kieu gi th msglist cx birender,
 */

//  giai thich can ke de hieu va thuyet phuc
