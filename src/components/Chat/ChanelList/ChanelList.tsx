import { BotMessageSquare } from 'lucide-react'
import Chanel from './Chanel/Chanel'
import '../../../layouts/ChatLayout/style.css'
import type { Follow } from '../../../types/follow.type'
import { memo } from 'react'

interface Props {
  follows: Follow[]
  onSetChanel: (newChanel: string) => void
}

const ChanelList = memo(({ follows, onSetChanel }: Props) => {
  return (
    <div className='hide-scrollbar overflow-y-auto h-full'>
      <div className='rounded-tl-lg bg-white sticky top-0 z-10 flex gap-2 items-center border-b p-1 border-gray-400'>
        <BotMessageSquare className='text-orange' />
        <span className='font-bold text-2xl'>Chats</span>
      </div>
      <div>
        {follows.map((item, _) => (
          <div key={item.followingId} onClick={() => onSetChanel(item.followingId)} className='px-2 cursor-pointer'>
            <Chanel item={item} />
          </div>
        ))}
      </div>
    </div>
  )
})

export default ChanelList
