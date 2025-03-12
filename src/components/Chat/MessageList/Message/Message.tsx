import React from 'react'

export default function Message() {
  return (
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
          <p className='break-words font-thin text-[13px] pr-5'>
           alofsdaf sadffffff  asssssssssssssssssssssssfffffff
          </p>
        </div>
      </div>
    </div>
  )
}
