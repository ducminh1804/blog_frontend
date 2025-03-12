import { BotMessageSquare } from 'lucide-react'
import Chanel from './Chanel/Chanel'
import '../../../layouts/ChatLayout/style.css'
export default function ChanelList() {
  return (
    <div className='hide-scrollbar overflow-y-auto h-full'>
      <div className='rounded-tl-lg bg-white sticky top-0 z-10 flex gap-2 items-center border-b p-1 border-gray-400'>
        <BotMessageSquare className='text-orange' />
        <span className='font-bold text-2xl'>Chats</span>
      </div>
      <div>
        {Array.from({ length: 30 }, (_, index) => (
          <div key={index} className='p-2 border-b border-gray-300 cursor-pointer'>
            <Chanel />
          </div>
        ))}
      </div>
    </div>
  )
}
