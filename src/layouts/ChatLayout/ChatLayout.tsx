import ChanelList from '../../components/Chat/ChanelList'
import MessageList from '../../components/Chat/MessageList'
import './style.css'

export default function ChatLayout() {
  return (
    <div className='fixed bottom-0 right-0 z-50'>
      <div className='bg-white flex border border-gray-700 border-b-0  rounded-t-lg w-[700px] h-[500px]'>
        <div className='flex-1 border-r-2 border-r-gray-400 overflow-y-auto '>
          <ChanelList />
        </div>
        <div className='hide-scrollbar flex-[2] overflow-y-auto'>
          <MessageList />
        </div>
      </div>
    </div>
  )
}
