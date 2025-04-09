import React from 'react'
import type { PostReponse } from '../../../types/post.type'

interface Props {
  item: PostReponse
}
export default function Similar({item}: Props) {
  return (
    <div className='cursor-pointer flex justify-start gap-2 my-2 border-b border-gray-300 pb-2 px-5'>
      <div className=''>
        <div className='flex gap-3'>
          <div className='rounded-full w-10 h-10 object-cover overflow-hidden'>
            <img
              src='data:image/jpeg;base64,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'
              alt=''
            />
          </div>
          <div className='font-thin '>{item.tags[0]?.name}</div>
        </div>
        <div className='font-bold text-xs mt-2'>{item.title}</div>
      </div>
      <div className='rounded h-40  overflow-hidden'>
        <img src={item.body} alt='' />
      </div>
    </div>
  )
}
