import React from 'react'
import Post from '../PostList/Post'
import { ArrowBigLeft, Undo2 } from 'lucide-react'
import InputComment from '../InputComment'
import Comment from '../CommentList/Comment'
import CommentList from '../CommentList'

export default function PostDetail() {
  return (
    <div className='border rounded p-3'>
      <div>
        <Post icon={<ArrowBigLeft />} />
      </div>
      <div>
        <InputComment />
        <CommentList />
      </div>
    </div>
  )
}
