import React from 'react'
import useLng from '../../hooks/useLng'
import { useTranslation } from 'react-i18next'

interface Props {
  icon: any
  color?: string
  text?: string
  lng: string
  trans: string
}
export default function NavItem({ icon, color, text, lng, trans }: Props) {
  const label = useLng({ lng: lng, toLng: trans })
  return (
    <div
      className={`flex items-center active:scale-95 transition-all gap-2 px-1 py-1 rounded-lg hover:cursor-pointer ${color || ''}`}
    >
      {icon}
      <span className='text-sm font-medium'>{label}</span>
    </div>
  )
}
