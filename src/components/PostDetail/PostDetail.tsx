import InputComment from '../InputComment'
import CommentList from '../CommentList'
import { useNavigate, useParams } from 'react-router-dom'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PostAPI } from '../../api/post.api'
import Post from '../PostList/Post'
import { ArrowBigLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CommentAPI } from '../../api/comment.api'
import classNames from 'classnames'
import { useAppSelector } from '../../redux/hooks'
import _ from 'lodash'
import type { CommentContent } from '../../types/comment.type'
export default function PostDetail() {
  const queryClient = useQueryClient()
  const { postId } = useParams()
  const { data, isFetching } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => PostAPI.getPostById(postId as string)
  })
  // const userId = useAppSelector((state) => state.auth.id)
  const { id: userId, username } = useAppSelector((state) => state.auth)
  const post = data?.data.data

  const [content, setContent] = useState<string>()

  const commentsQuery = useInfiniteQuery({
    queryKey: ['comments', postId],
    queryFn: ({ pageParam }) => CommentAPI.getComments(postId as string, 0, pageParam, 6),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.data.data.pageable.pageNumber + 1
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

  const handleContent = (value: string) => {
    setContent(value)
  }

  const commentMutation = useMutation({
    mutationFn: (content: string) => CommentAPI.createComment(0, userId, postId as string, content)
  })

  useEffect(() => {
    if (content) {
      commentMutation.mutate(content as string)
      const cmt: CommentContent = {
        id: Date.now(),
        parentId: 0,
        userId,
        content,
        createdAt: new Date().toISOString(),
        username,
        voteDown: 0,
        voteUp: 0
      }
      //cache lai querydata
      queryClient.setQueryData(['comments', postId], (oldData: any) => {
        if (!oldData) return oldData
        /**
         * update(obj:doi tuong can update,co the la obj nen dung {},
         * Đây là oldData (dữ liệu hiện tại từ cache) đã được clone nhẹ bằng { ...oldData }
         * để tạo một tham chiếu mới (tránh thay đổi trực tiếp oldData).
         *
         * path:duong dan den doi tuong do can update
         *
         * updaterFn: Hàm nhận giá trị cũ và trả về giá trị mới
         */

        return _.update({ ...oldData }, 'pages[0].data.data.content', (comments) => [cmt, ...comments])
      })
    }

    // queryClient.removeQueries({ queryKey: ['comments', postId] }) // Xóa cache
    // queryClient.invalidateQueries({ queryKey: ['comments', postId] }) // Buộc fetch lại
  }, [content])

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
          <InputComment handleContent={handleContent} />
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
