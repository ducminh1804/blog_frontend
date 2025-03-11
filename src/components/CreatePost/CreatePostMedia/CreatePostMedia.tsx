import { ImageUp, Trash2 } from 'lucide-react'
import React, { useRef, useState } from 'react'

export default function CreatePostMedia() {
  const maxSize = 300
  const [size, setSize] = useState(maxSize)

  const [type, setType] = useState<any>()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let size = e.target.value.length
    setSize(size)
  }

  const [media, setMedia] = useState<any>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setMedia(URL.createObjectURL(e.target.files[0]) as any)
      const type = e.target.files[0].type.startsWith('image') ? 'image' : 'video'
      setType(type)
    }
  }

  const refInput = useRef<any>(null)
    const handleClick = () => {
      refInput.current?.click()
    }

  return (
    <div>
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
      </div>

      <div>
        <input hidden ref={refInput} type='file' accept='image/*, video/*' onChange={(e) => handleImageUpload(e)} />
      </div>

      <div className='boder border-gray-700 border-2 p-2 rounded-xl mt-10 w-fit h-fit'>
        {media ? (
          <div className=''>
            {type === 'image' ? (
              <img src={media} alt='preview' className='max-w-[800px] max-h-[600px] object-contain' />
            ) : (
              <video src={media} controls className='max-w-[800px] max-h-[600px] object-contain' />
            )}
            <div onClick={() => setMedia(null)}>
              <Trash2 className='text-gray-700 cursor-pointer active:scale-95 transition-all' />
            </div>
          </div>
        ) : (
          <div
            onClick={handleClick}
            className='hover:cursor-pointer border-2 border-gray-200 p-5 flex justify-center items-center w-80 rounded-2xl'
          >
            <ImageUp color='gray' />
          </div>
        )}
      </div>
    </div>
  )
}
