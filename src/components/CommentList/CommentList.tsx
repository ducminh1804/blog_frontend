import type { CommentContent } from '../../types/comment.type'
import Comment from './Comment/Comment'

interface Props {
  comments?: CommentContent[]
  postId: string
  isFetching?: boolean
  hasNextPage?:boolean
}
export default function CommentList({ comments, postId, isFetching, hasNextPage }: Props) {
  return (
    <div>
      {comments?.map((comment) => (
        <div key={comment.id} className='pb-3 pl-3'>
          <Comment comment={comment} postId={postId} />
        </div>
      ))}
    </div>
  )
}
