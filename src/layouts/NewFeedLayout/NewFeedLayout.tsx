import React, { useRef, useEffect, type ReactNode, useState, useMemo, useLayoutEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { scrolling } from '../../redux/slices/scroll.slice'

interface Props {
  leftChild: any
  rightChild: ReactNode
}

export default function NewFeedLayout({ leftChild, rightChild }: Props) {
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const position = useAppSelector((state) => state.scroll.position)
  const dispatch = useAppDispatch()
  const [curPos, setCurPos] = useState(0)

  useEffect(() => {
    const leftColumn = leftColumnRef.current
    if (!leftColumn) return
    leftColumn.scrollTop = position
    // console.log('position', position)
    // console.log('leftColumnRef', leftColumnRef)
  })

  // console.log('quay lai nf')

  return (
    <div className='flex px-8 gap-10 my-4 h-screen'>
  
      {/* Cột bài viết */}
      <div ref={leftColumnRef} className='flex-2 w-2/3 bg-zinc-50 h-full overflow-y-auto p-4 rounded-lg shadow'>
        {/* {leftChild} */}
        {React.cloneElement(leftChild, { postRef: leftColumnRef })}
      </div>

      {/* Cột lịch sử */}
      <div className='flex-1 w-1/3 bg-zinc-50 h-full overflow-y-auto p-4 rounded-lg shadow'>{rightChild}</div>
    </div>
  )
}
