import React, { useEffect, useState } from 'react'
import Vote from '../../Vote'
import NavItem from '../../NavItem'
import { MessageSquareQuote } from 'lucide-react'
import type { CommentContent } from '../../../types/comment.type'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CommentAPI } from '../../../api/comment.api'
import CommentList from '../CommentList'
import classNames from 'classnames'
import InputComment from '../../InputComment'
import _ from 'lodash'
import { initComment } from '../../../constants/initComment'
import Skeleton from '../../Skeleton'
import Spinner from '../../Spinner'

interface Props {
  comment: CommentContent
  postId: string
}
export default function Comment({ comment, postId }: Props) {
  const { content, createdAt, id, userId, voteDown, voteUp, username, parentId } = comment
  const [expand, setExpand] = useState<{ ex: boolean; msg: string }>({ ex: false, msg: 'More replies' })
  const [reply, setReply] = useState(false)
  const queryClient = useQueryClient()

  const checkQuery = useQuery({
    queryKey: ['flag', id],
    queryFn: () => CommentAPI.checkReplys(id)
  })

  const commentsQuery = useInfiniteQuery({
    queryKey: ['comments', postId, id],
    //pageParam mac dinh ban dau initialPagaParam
    queryFn: ({ pageParam }) => CommentAPI.getComments(postId as string, id, pageParam, 2),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // if (lastPage?.data?.data?.last) return undefined
      return lastPage.data.data.pageable.pageNumber + 1
    },
    enabled: expand.ex
  })

  // lay data
  const flag = checkQuery.data?.data.data

  const subComments =
    commentsQuery.data?.pages.flatMap((item) => {
      return item.data.data.content
    }) || []

  const last = commentsQuery.data?.pages.at(-1)?.data.data.last

  const handleLoadChild = () => {
    setExpand((prev) => ({
      ex: !prev.ex,
      msg: prev.ex ? 'More reply' : 'Hide replies'
    }))
  }

  const handleLoadParent = () => {
    commentsQuery.fetchNextPage()
  }

  const handleReply = () => {
    setReply(!reply)
  }

  const [cmt, setCmt] = useState<string>()

  const handleContent = (value: string) => {
    setCmt(value)
  }

  const commentMutation = useMutation({
    mutationFn: (cmt: string) => CommentAPI.createComment(id, userId, postId as string, cmt)
  })

  useEffect(() => {
    if (cmt) {
      setExpand((prev) => ({
        ex: true,
        msg: prev.msg
      }))

      commentMutation.mutate(cmt as string)
      const newCmt: CommentContent = {
        id: Date.now(),
        parentId: 0,
        userId,
        content: cmt,
        createdAt: new Date().toISOString(),
        username,
        voteDown: 0,
        voteUp: 0
      }
      queryClient.setQueryData(['comments', postId, id], (oldData: any) => {
        console.log(oldData)
        if (!oldData) {
          oldData = initComment(newCmt, id, postId)
          return _.update(oldData, 'pages[0].data.data.content', (comments) => {
            console.log("'📌 comments trước khi cập nhật:', comments)", oldData)
            return [newCmt]
          })
        }

        return _.update({ ...oldData }, 'pages[0].data.data.content', (comments = []) => {
          console.log('📌 comments trước khi cập nhật:', comments)
          return [newCmt, ...comments]
        })
      })
    }
    console.log('end')
  }, [cmt])

  return (
    <div>
      <div className='flex gap-2 items-start my-3'>
        <div>
          <img
            className='w-8 h-8 object-cover rounded-full border'
            src='https://preview.redd.it/snoovatar/avatars/ff5b73a1-e7c5-44bd-8de7-757621afc799-headshot.png?width=64&height=64&crop=smart&auto=webp&s=7799a30d40c46085e35675dbfc616113132b2f33'
            alt=''
          />
        </div>
        <div className='flex-1 min-w-0'>
          <div>
            <span className='font-bold text-[13px] font-sans'>{username}</span>
            <span>userId: {userId}</span>
          </div>
          <div>
            <p className='break-words font-thin text-[13px] pr-5'>{content}</p>
            <span>commentId: {id}</span>
            <span>parentId: {parentId}</span>
          </div>
        </div>
      </div>
      <div>
        <div className='flex flex-col gap-1'>
          <div className='flex gap-10 items-center pl-8'>
            <Vote voteVal={voteUp - voteDown} />
            <div onClick={handleReply}>
              <NavItem icon={<MessageSquareQuote />} text='Reply' />
            </div>
          </div>

          {reply && <InputComment handleContent={handleContent} />}
          <div
            className={classNames('', {
              block: flag === 1,
              hidden: flag === 0
            })}
          >
            <button onClick={handleLoadChild} className='btn text-xs pl-10 font-bold active:scale-95 transition-all'>
              {expand.msg}
            </button>
          </div>

          <div
            className={classNames('ml-3 pl-3 border-l', {
              none: expand.ex,
              hidden: !expand.ex
            })}
          >
            {commentsQuery.isFetching ? (
              <Spinner />
            ) : (
              <>
                <CommentList comments={subComments} postId={postId} />
                <button
                  onClick={handleLoadParent}
                  className={classNames('btn text-xs pl-5 text-orange font-bold active:scale-95 transition-all', {
                    block: !last,
                    hidden: last
                  })}
                >
                  More replies
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
