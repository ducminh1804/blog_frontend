import InputComment from '../InputComment'
import CommentList from '../CommentList'
import { useNavigate, useParams } from 'react-router-dom'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { PostAPI } from '../../api/post.api'
import Post from '../PostList/Post'
import { ArrowBigLeft } from 'lucide-react'
import { useEffect } from 'react'
import { CommentAPI } from '../../api/comment.api'
import classNames from 'classnames'

export default function PostDetail() {
  const { postId } = useParams()
  const { data, isFetching } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => PostAPI.getPostById(postId as string)
  })
  const post = data?.data.data

  
  const commentsQuery = useInfiniteQuery({
    queryKey: ['comments', postId],
    //pageParam mac dinh ban dau initialPagaParam
    queryFn: ({ pageParam }) => CommentAPI.getComments(postId as string, 0, pageParam, 2),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // if (lastPage?.data?.data?.last) return undefined
      return lastPage.data.data.pageable.pageNumber + 1
    }
  })

  //chuan bi data
  const comments =
    commentsQuery.data?.pages.flatMap((item) => {
      return item.data.data.content
    }) || []

  const last = commentsQuery.data?.pages.at(-1)?.data.data.last

  const handleLoad = () => {
    if (commentsQuery.hasNextPage) {
      commentsQuery.fetchNextPage()
    }
  }

  return (
    <div className='rounded p-3'>
      <div key={post?.id}>
        {post && (
          <Post
            icon={<ArrowBigLeft />}
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
      <div>
        <div>
          <InputComment />
        </div>
        <div>
          <CommentList comments={comments} postId={postId as string} />
          <button
            onClick={handleLoad}
            className={classNames('btn text-xs pl-5 text-orange font-bold active:scale-95 transition-all', {
              block: !last,
              hidden: last
            })}
          >
            More replies
          </button>
        </div>
      </div>
    </div>
  )
}
