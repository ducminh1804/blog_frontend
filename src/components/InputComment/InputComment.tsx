import React, { useRef, useState } from 'react'

interface Props {
  handleContent?: (value: string) => void
}

export default function InputComment({ handleContent }: Props) {
  const [focus, setFocus] = useState(false)
  const inputRef = useRef<any>(null)
  // const handleComment = () => {
  //   if (inputRef.current) {
  //     console.log(inputRef.current.value)
  //     // Gửi comment lên server
  //   }
  // }
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
          ref={inputRef}
          required
          placeholder='Add a comment'
          className=' p-2 w-full min-h-12 resize-none overflow-hidden focus:outline-none'
          onInput={(e) => {
            e.currentTarget.style.height = 'auto' // Reset chiều cao
            e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px' // Set chiều cao theo nội dung
          }}
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
          <button
            onClick={() => handleContent && handleContent(inputRef.current.value)}
            className='btn bg-red-500 text-xs font-bold active:scale-95 transition-all text-white rounded-full p-2'
          >
            Comment
          </button>
        </div>
      )}
    </div>
  )
}
