import { SendHorizontal } from 'lucide-react'
import React from 'react'

export default function InputMessage() {
  return (
    <div>
      <div className='flex items-center gap-2 px-4 '>
        <div className='px-5 flex-1 '>
          <input type='text' className='bg-gray-200 border w-full rounded-full p-3' placeholder='Message' />
        </div>
        <div className='active:scale-95 transition-all cursor-pointer'>
          <SendHorizontal />
        </div>
      </div>
    </div>
  )
}
