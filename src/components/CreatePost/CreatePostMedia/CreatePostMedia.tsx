import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ImageUp, Trash2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { PostAPI, type MediaType } from '../../../api/post.api'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../Spinner'

export default function CreatePostMedia() {
  const maxSize = 300
  const [size, setSize] = useState(maxSize)
  const tag = useOutletContext()
  const queryClient = useQueryClient()
  const [type, setType] = useState<any>()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let size = e.target.value.length
    setSize(size)
  }

  const [media, setMedia] = useState<any>(null)
  const [file, setFile] = useState<any>(null)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setMedia(URL.createObjectURL(e.target.files[0]) as any)
      const type = e.target.files[0].type.startsWith('image') ? 'image' : 'video'
      setType(type)
      setFile(e.target.files[0])
    }
  }

  const refInput = useRef<any>(null)
  const refTitle = useRef<any>(null)
  const handleClick = () => {
    refInput.current?.click()
  }

  const postMutation = useMutation({
    mutationFn: PostAPI.createPostMedia
  })

  const handlePost = async () => {
    if (!file || !refTitle || !tag) return

    const data: MediaType = {
      title: refTitle.current.value,
      kind: type,
      tags: tag as string,
      file: file
    }

    try {
      await postMutation.mutateAsync(data)
      toast.success('Post Success')
      // queryClient.invalidateQueries({queryKey:['posts']}) // Buộc fetch lại dữ liệu mới nhất
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div>
        <textarea
          ref={refTitle}
          required
          placeholder='Title*'
          className='border border-black rounded-2xl p-2 mt-5 w-80 min-h-12 resize-none overflow-hidden'
          rows={1}
          onInput={(e) => {
            e.currentTarget.style.height = 'auto'
            e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px'
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

      <div>
        {postMutation.isPending ? (
          <Spinner />
        ) : (
          <button
            onClick={handlePost}
            className='bg-orange rounded-sm p-2 text-white font-bold mt-5 active:scale-95 transition-all'
          >
            Post
          </button>
        )}
      </div>
    </div>
  )
}
