import React from 'react'

interface Props {
  icon: any
  text?: string
  color?: string
}
export default function NavItem({ icon, text, color }: Props) {
  return (
    <div
      className={`flex items-center active:scale-95 transition-all gap-2 px-1 py-1 rounded-lg hover:cursor-pointer ${color || ''}`}
    >
      {icon}
      <span className='text-sm font-medium'>{text}</span>
    </div>
  )
}
