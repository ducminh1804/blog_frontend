import { ArrowBigLeft, Undo2 } from 'lucide-react'
import React, { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  icon: ReactNode
  tag: { tagName: string; tagId: string }
  timeAgo: number
}
export default function Credit({ icon, tag, timeAgo }: Props) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1) // Không reset trang
  }

  return (
    <div>
      <div className='flex items-center gap-2'>
        <div onClick={handleClick} className='cursor-pointer active:scale-95 transition-all hover:text-blue-800'>
          {icon}
        </div>
        <div>
          <img
            src='data:image/webp;base64,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'
            alt=''
            className='w-8 h-8 rounded-full object-cover'
          />
        </div>
        <div className='font-mono text-base'>{tag.tagName} • </div>
        <div className='opacity-60 text-sm'>{timeAgo} days ago</div>
      </div>
    </div>
  )
}
