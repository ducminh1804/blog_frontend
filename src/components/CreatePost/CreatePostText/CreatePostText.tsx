import { max } from 'lodash'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

export default function CreatePostText() {
  const maxSize = 300
  const [size, setSize] = useState(maxSize)
  const tag = useOutletContext()
  console.log(tag)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let size = e.target.value.length
    setSize(size)
  }

  return (
    <div>
      <textarea
        required
        placeholder='Title*'
        className='border border-black rounded-2xl p-2 mt-5 w-80 min-h-12 resize-none overflow-hidden'
        rows={1} // Ban đầu 1 dòng
        onInput={(e) => {
          e.currentTarget.style.height = 'auto' // Reset chiều cao
          e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px' // Set chiều cao theo nội dung
        }}
        maxLength={maxSize}
        onChange={(e) => handleChange(e)}
      />
      <span className='ml-10'>
        {Math.max(0, maxSize - size)}/{maxSize}
      </span>
      <div>
        <button className='bg-orange rounded-sm p-2 text-white font-bold mt-5 active:scale-95 transition-all'>
          Post
        </button>
      </div>
    </div>
  )
}
