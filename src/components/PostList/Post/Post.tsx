import Credit from '../../Credit'
import Vote from '../../Vote'
import NavItem from '../../NavItem'
import { BookMarked, MessageCircle } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  icon: ReactNode
}
export default function Post({ icon }: Props) {
  return (
    <div className='mt-2 mb-4 border-b-2 pb-5'>
      <Credit icon={icon} />
      <div className='py-3'>content</div>
      <div className='py-3'>
        <img
          src='https://preview.redd.it/todays-mood-woke-up-and-chose-chaos-v0-inzkk5yea1oe1.jpeg?width=1080&crop=smart&auto=webp&s=0789500a590832cb4f4f98d2d6ede03f0c961ba2'
          alt=''
          className='w-full h-auto rounded-lg object-cover'
        />
      </div>
      <div className='flex gap-2 '>
        <Vote voteVal={12} />
        <NavItem icon={<MessageCircle />} color='bg-slate-400' text='93' />
        <NavItem icon={<BookMarked />} color='bg-slate-400' />
      </div>
    </div>
  )
}
