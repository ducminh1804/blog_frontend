import React from 'react'

export default function Chanel() {
  return (
    <div>
      <div className='flex gap-2 cursor-pointer'>
        <div>
          <img
            className='w-8 h-8 object-cover rounded-full'
            src='https://styles.redditmedia.com/t5_bbqyei/styles/communityIcon_y1rxbaegsxfd1.png'
            alt=''
          />
        </div>
        <div className='flex flex-col'>
          <span className='font-sans  opacity-80 text-[12px]'>r/VietNamNation</span>
          <span className='text-[11px]'>tin nhan tam thoi</span>
        </div>
      </div>
    </div>
  )
}
