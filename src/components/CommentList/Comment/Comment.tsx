import React from 'react'
import Vote from '../../Vote'
import NavItem from '../../NavItem'
import { MessageSquareQuote } from 'lucide-react'

export default function Comment() {
  return (
    <div>
      <div className='flex gap-2 items-start my-3'>
        <div>
          <img
            className='w-8 h-8 object-cover rounded-full border'
            src='https://preview.redd.it/snoovatar/avatars/ff5b73a1-e7c5-44bd-8de7-757621afc799-headshot.png?width=64&height=64&crop=smart&auto=webp&s=7799a30d40c46085e35675dbfc616113132b2f33'
            alt=''
          />
        </div>
        <div className='flex-1 min-w-0'>
          <div>
            <span className='font-bold text-[13px] font-sans'>brian</span>
          </div>
          <div>
            <p className='break-words font-thin text-[13px] pr-5'>alofsdaf sadffffff asssssssssssssssssssssssfffffff</p>
          </div>
        </div>
      </div>
      <div>
        <div className='flex flex-col gap-1'>
          <div className='flex gap-10 items-center pl-8'>
            <Vote voteVal={2} />
            <NavItem icon={<MessageSquareQuote />} text='Reply' />
          </div>
          <span className='pl-10 opacity-80 text-xs cursor-pointer '>More reply</span>
        </div>
      </div>
    </div>
  )
}
