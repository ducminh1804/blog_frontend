import React, { useEffect, useState } from 'react'
import { CirclePlus, Globe, BookOpen, Search, Bot, Laugh, Languages } from 'lucide-react'
import NavItem from '../NavItem'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom'
import { onChat } from '../../redux/slices/chat.slice'
import type { Lng } from '../../types/lng.type'
import { Trans, useTranslation } from 'react-i18next'
import { clearLS } from '../../services/localstore.service'
import { removeFromSs } from '../../utils/saveToSs'
import useLng from '../../hooks/useLng'

export default function Header() {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const handleChat = () => {
    !isAuth ? navigate('/login') : dispatch(onChat())
  }
  const handleCreatePost = () => {
    !isAuth ? navigate('/login') : navigate('/create-post/text')
  }

  const [lng, setLng] = useState(localStorage.getItem('i18nextLng') || 'en')
  const [toLng, setToLng] = useState('vi')

  const handleLanguage = () => {
    const lngLs = localStorage.getItem('i18nextLng') || 'vi'
    lngLs === 'en' ? setLng('vi') : setLng('en')
  }

  const handleLogout = () => {
    clearLS()
    window.location.reload()
    removeFromSs('posts')
    // navigate('/login')
  }

  const handleLogin = () => {
    navigate('/login')
  }
  useEffect(() => {
    i18n.changeLanguage(lng)
    lng === 'vi' ? setToLng('en') : setToLng('vi')
  }, [lng])

  return (
    <div className='sticky top-0 z-50'>
      <nav className='flex items-center justify-between px-28 py-5 bg-white shadow-md'>
        {/* Logo */}
        <div className='flex items-center gap-4 cursor-pointer'>
          <div className='flex items-center gap-2 border-r-2 border-gray-600 pr-1 ' onClick={() => navigate('/')}>
            <img
              src='data:image/jpeg;base64,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'
              alt='Spiderum Logo'
              className='h-8'
            />
            <span className='font-bold font-sans text-3xl'>reddit</span>
          </div>

          {/* Navigation */}
          <div className='flex items-center gap-3'>
            <div onClick={handleChat}>
              <NavItem
                icon={<Bot size={20} className='text-blue-600' />}
                color='bg-blue-100'
                lng='Chat'
                trans='Tro Chuyen'
              />
            </div>
            <div onClick={handleCreatePost}>
              <NavItem
                icon={<CirclePlus size={20} className='text-green-600' />}
                color='bg-green-100'
                lng='Create Post'
                trans='Tao Bai Viet'
              />
            </div>
          </div>
        </div>

        <input
          placeholder={useLng({ lng: 'Search', toLng: 'Tìm Kiếm' })}
          className=' mx-2 flex-1 border rounded-3xl border-black p-2 rounded-md'
        />

        {/* Search & Auth */}
        {!isAuth ? (
          <div className='flex items-center gap-4'>
            <button
              onClick={handleLogin}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg active:scale-95 transition-all'
            >
              {useLng({ lng: 'Login', toLng: 'Đăng Nhập' })}
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg active:scale-95 transition-all'
          >
            {useLng({ lng: 'Logout', toLng: 'Đăng Xuất' })}
          </button>
        )}

        <div className='ml-2' onClick={handleLanguage}>
          {/* <NavItem color='bg-blue-100' icon={<Languages size={20} className='text-blue-600' />} text={toLng} lng='' trans=''/> */}
          <NavItem
            color='bg-blue-100'
            icon={<Languages size={20} className='text-blue-600' />}
            lng='vi'
            trans='en'
          />
        </div>
      </nav>
    </div>
  )
}
