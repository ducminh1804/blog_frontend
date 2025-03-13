import Credit from '../../Credit'
import Vote from '../../Vote'
import NavItem from '../../NavItem'
import { BookMarked, MessageCircle } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { getDaysDifference } from '../../../utils/getDaysDifference'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../redux/hooks'
import { scrolling } from '../../../redux/slices/scroll.slice'

interface Props {
  id: string
  icon?: ReactNode
  username: string
  crtAt: string
  tagName: string
  tagId: string
  title: string
  kind: string
  body: string
  upVoted: number
  downVoted: number
  postRef?: React.RefObject<HTMLDivElement>
}
export default function Post(props: Props) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id, icon, crtAt, tagName, tagId, title, body, upVoted, downVoted, username, kind, postRef } = props

  const timeAgo = getDaysDifference(crtAt)
  const handleClick = () => {
    navigate(`/post/${id}`)
    const position = postRef?.current?.scrollTop
    dispatch(scrolling(position))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='mt-2 mb-4 border-b-2 pb-5'>
      <Credit icon={icon} tag={{ tagName, tagId }} timeAgo={timeAgo} />
      <div className='py-3'>{title}</div>
      <div className='py-3'>
        {kind === 'image' ? (
          <img loading='lazy' src={body} alt='' className='w-full h-auto rounded-lg object-cover' />
        ) : (
          <video controls src={body}></video>
        )}
      </div>
      <div className='flex gap-2 '>
        <Vote voteVal={upVoted - downVoted} />
        <div onClick={handleClick}>
          <NavItem icon={<MessageCircle />} color='bg-slate-400' text='93' />{' '}
        </div>
        <div>
          <NavItem icon={<BookMarked />} color='bg-slate-400' />
        </div>
      </div>
    </div>
  )
}
