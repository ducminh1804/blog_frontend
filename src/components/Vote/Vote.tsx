import React, { useState } from 'react'
import { CircleArrowDown, CircleArrowUp } from 'lucide-react'
import VoteButton from './VoteButton'
import classNames from 'classnames'

interface Props {
  voteVal: number
}

export default function Vote({ voteVal }: Props) {
  const [vote, setVote] = useState<boolean>(false)
  const [downVote, setDownVote] = useState<boolean>(false)
  const [val, setVal] = useState(voteVal)

  const handleUpvote = () => {
    if (vote) {
      setVote(false)
      setVal((prev) => prev - 1)
    } else {
      setVote(true)
      setDownVote(false)
      setVal((prev) => (downVote ? prev + 2 : prev + 1))
    }
  }

  const handleDownvote = () => {
    if (downVote) {
      setDownVote(false)
      setVal((prev) => prev + 1)
    } else {
      setVote(false)
      setDownVote(true)
      setVal((prev) => (vote ? prev - 2 : prev - 1))
    }
  }
  return (
    <div>
      <div
        className={classNames('flex items-center rounded-md ', {
          'bg-orange': vote,
          'bg-blue-700': downVote
        })}
      >
        <VoteButton
          active={vote}
          icon={
            <CircleArrowUp
              color={classNames({
                white: vote,
                black: !vote
              })}
            />
          }
          onClick={handleUpvote}
        />
        <span
          className={classNames('px-2 font-bold text-center min-w-[40px]', {
            'text-white': vote || downVote
          })}
        >
          {val}
        </span>
        <VoteButton
          active={downVote}
          icon={
            <CircleArrowDown
              color={classNames({
                white: downVote,
                black: !downVote
              })}
            />
          }
          onClick={handleDownvote}
        />
      </div>
    </div>
  )
}
