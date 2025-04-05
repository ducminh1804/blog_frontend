import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { NavLink, Outlet } from 'react-router-dom'
import { TagAPI } from '../../api/tag.api'
import { useState } from 'react'
import useLng from '../../hooks/useLng'

export default function CreatePostLayout() {
  const tagQuery = useQuery({
    queryKey: ['tags'],
    queryFn: () => TagAPI.getAll()
  })

  const [tag, setTag] = useState<string>()
  const data = tagQuery.data?.data.data || []

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTag(e.target.value)
  }

  return (
    <div className=' p-10 bg-white'>
      <div>
        <span className='font-bold font-sans text-3xl'>{useLng({ lng: 'Create Post', toLng: 'Tạo Bài Viết' })}</span>
      </div>
      <div>
        <select
          onChange={handleChange}
          required
          className='mt-2 text-center h-12 border border-black rounded-full'
          defaultValue=''
        >
          <option value='' disabled>
            {useLng({ lng: 'Select Tag', toLng: 'Chọn Thẻ' })}
          </option>
          {data.map((tag) => (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      <div className='mt-5 flex gap-10'>
        <NavLink
          to={'/create-post/text'}
          className={({ isActive }) =>
            classNames('pb-2 text-gray-700 text-xl ', {
              'text-black font-bold border-b-4 border-blue-600': isActive,
              '': !isActive
            })
          }
        >
          {useLng({ lng: 'Text', toLng: 'Văn Bản' })}
        </NavLink>

        <NavLink
          to={'/create-post/media'}
          className={({ isActive }) =>
            classNames('pb-2 text-gray-700 text-xl', {
              'text-black font-bold border-b-4 border-blue-600': isActive,
              '': !isActive
            })
          }
        >
          {useLng({ lng: 'Image & Video', toLng: 'Hình Ảnh & Video' })}
        </NavLink>
      </div>
      <Outlet context={tag} />
    </div>
  )
}
