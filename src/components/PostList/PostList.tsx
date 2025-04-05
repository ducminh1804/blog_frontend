import React, { useEffect, useRef, useState } from 'react'
import Post from './Post/Post'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { PostAPI } from '../../api/post.api'
import Skeleton from '../Skeleton'

interface Props {
  postRef?: React.RefObject<HTMLDivElement>
}

export default function PostList({ postRef }: Props) {
  // console.log("kiem tra co bi re render khi newFeed no render k?")

  const getPosts = PostAPI.getPosts
  const { data, isFetching, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    // truyen cai dieu kien vao,//pageParam mac dinh ban dau initialPagaParam
    queryFn: ({ pageParam }) => getPosts(pageParam),
    initialPageParam: new Date().toISOString(),
    //lay ra dieu kien cua page before de fetch tiep tuc
    getNextPageParam: (lastPage, pages) => lastPage.data.data.at(-1)?.createdAt
  })
  //xu li props ref tu newfeed
  //

  //lam phang page tra ve,de lay ra data that su tu apiresponse
  const posts = data?.pages.flatMap((page) => page.data.data) || []
  const lastPostRef = useRef<any>(null)

  // 👉 Lần đầu tiên useEffect chạy, nó chỉ khởi tạo IntersectionObserver để theo dõi lastPostRef.

  // 👉 Sau đó, mỗi khi lastPostRef xuất hiện trong viewport, Observer sẽ tự động gọi fetchNextPage().

  // 👉 useEffect không cần chạy lại sau mỗi lần fetch, vì Observer đã hoạt động độc lập.
  useEffect(() => {
    if (!lastPostRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage()
          }
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(lastPostRef.current)
    //xu li khi component unmount
    return () => observer.disconnect()
  }, [isFetching])

  return (
    <div className='p-2'>
      {posts.map((post, index) => {
        const isLastPost = index === posts.length - 1
        return (
          <div key={post.id} ref={isLastPost ? lastPostRef : null}>
            {isFetching && hasNextPage ? (
              <Skeleton />
            ) : (
              <Post
                postRef={postRef}
                id={post.id}
                username={post.username}
                crtAt={post.createdAt}
                tagName={post.tags[0]?.name}
                tagId={post.tags[0].id}
                title={post.title}
                kind={post.kind}
                body={post.body}
                upVoted={post.upVoted}
                downVoted={post.downVoted}
              />
            )}
          </div>
        )
      })}
     
    </div>
  )
}
