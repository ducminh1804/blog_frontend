import React from 'react'
import Post from '../components/PostList/Post'

export default function HistoryList() {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, index) => (
        <Post key={index} />
      ))}
    </div>
  )
}
