import React from 'react'
import PostList from '../../components/PostList'
import HistoryList from '../../HistoryList/HistoryList'

export default function NewFeedLayout() {
  return (
    <div className='flex px-8 gap-10 my-4 h-screen'>
      {/* Cột bài viết */}
      <div className='flex-2 w-2/3 bg-zinc-50 h-full overflow-y-auto p-4 rounded-lg shadow'>
        <PostList />
      </div>

      {/* Cột lịch sử */}
      <div className='flex-1 w-1/3 bg-zinc-50 h-full overflow-y-auto p-4 rounded-lg shadow'>
        <HistoryList />
      </div>
    </div>
  )
}
