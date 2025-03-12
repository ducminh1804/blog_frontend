import React, { useState } from 'react'

export default function InputComment() {
  const [focus, setFocus] = useState(false)
  const handleChange = () => {
    console.log('object')
  }
  const handleFocus = () => {
    setFocus(true)
  }
  const handleCancel = () => {
    setFocus(false)
  }
  return (
    <div className='border bg-white p-2 rounded-2xl'>
      <div>
        <textarea
          required
          placeholder='Add a comment'
          className=' p-2 w-full min-h-12 resize-none overflow-hidden focus:outline-none'
          onInput={(e) => {
            e.currentTarget.style.height = 'auto' // Reset chiều cao
            e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px' // Set chiều cao theo nội dung
          }}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
      {focus && (
        <div className='flex gap-2 justify-end items-center'>
          <button
            onClick={handleCancel}
            className='btn bg-gray-800 text-xs font-bold active:scale-95 transition-all text-white rounded-full p-2'
          >
            Cancel
          </button>
          <button className='btn bg-red-500 text-xs font-bold active:scale-95 transition-all text-white rounded-full p-2'>
            Comment
          </button>
        </div>
      )}
    </div>
  )
}
