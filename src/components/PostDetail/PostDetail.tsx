import InputComment from '../InputComment'
import CommentList from '../CommentList'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { PostAPI } from '../../api/post.api'
import Post from '../PostList/Post'
import { ArrowBigLeft } from 'lucide-react'

export default function PostDetail() {
  const { postId } = useParams()
  console.log(postId)
  const getPostById = PostAPI.getPostById
  const { data, isFetching } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId as string)
  })
  console.log(data)
  const post = data?.data.data
  return (
    <div className='border rounded p-3'>
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
        <InputComment />
        <CommentList />
      </div>
    </div>
  )
}
