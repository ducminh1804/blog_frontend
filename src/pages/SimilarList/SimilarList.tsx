import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PostAPI } from '../../api/post.api'
import Skeleton from '../../components/Skeleton'
import Post from '../../components/PostList/Post'
import Similar from './Similar/Similar'

export default function SimilarList() {
  const location = useLocation()
  const title = location.state?.title

  const postsQuery = useQuery({
    queryKey: ['posts', title],
    queryFn: () => PostAPI.getSimilarPosts(title)
  })

  const posts = postsQuery?.data?.data.data || []
  const isFetching = postsQuery.isFetching
  console.log(posts)
  return (
    <div>
      <div className='p-2 flex flex-col items-center   justify-between'>
        {posts.map((post, index) => {
          return (
            <div className='w-[40%] '>
              <Similar key={post.id} item={post} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
