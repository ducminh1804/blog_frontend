import classNames from 'classnames'
import { NavLink, Outlet } from 'react-router-dom'

export default function CreatePostLayout() {
  return (
    <div className=' p-10 bg-white'>
      <div>
        <span className='font-bold font-sans text-3xl'>Create post</span>
      </div>
      <div>
        <input
          type='text'
          required
          className='mt-2 pl-6 h-12 border border-black rounded-full'
          placeholder='Select a community'
        />
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
          Text
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
          Image & Video
        </NavLink>
      </div>

      <Outlet />
    </div>
  )
}
