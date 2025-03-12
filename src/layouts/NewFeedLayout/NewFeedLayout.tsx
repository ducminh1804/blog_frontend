import React, { type ReactNode } from 'react'
import PostList from '../../components/PostList'
import HistoryList from '../../components/HistoryList'
interface Props {
  leftChild: ReactNode
  rightChild: ReactNode
}
export default function NewFeedLayout({ leftChild, rightChild }: Props) {
  return (
    <div className='flex px-8 gap-10 my-4 h-screen'>
      {/* Cột bài viết */}
      <div className='flex-2 w-2/3 bg-zinc-50 h-full overflow-y-auto p-4 rounded-lg shadow'>{leftChild}</div>

      {/* Cột lịch sử */}
      <div className='flex-1 w-1/3 bg-zinc-50 h-full overflow-y-auto p-4 rounded-lg shadow'>{rightChild}</div>
    </div>
  )
}
