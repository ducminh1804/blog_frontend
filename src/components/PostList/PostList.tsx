import React from 'react'
import Post from './Post/Post'

export default function PostList() {
  return (
    <div className='p-2 '>
      {Array.from({ length: 10 }).map((_, index) => (
        <Post key={index} />
      ))}
      <Post />
      <Post />
    </div>
  )
}
