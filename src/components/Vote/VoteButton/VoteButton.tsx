import { on } from 'events'
import React, { type ReactNode } from 'react'
import classNames from 'classnames'

interface Props {
  onClick: () => void
  active: boolean
  icon: any
}
export default function VoteButton({ onClick, active, icon }: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames('p-2 active:scale-95 transition-all hover:cursor-pointer', {
        'text-orange': active,
        none: !active
      })}
    >
      {icon}
    </div>
  )
}
