import { SendHorizontal } from 'lucide-react'
import React, { memo } from 'react'
import { sendMessage } from '../../../../services/stompService'
import { useStomp } from '../../../../hooks/useStomp'
import type { msgType } from '../../../../types/message.type'
import { useAppSelector } from '../../../../redux/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { toMessageType } from '../../../../utils/toMessageType'

interface Props {
  chanel: string
}

const InputMessage = memo(({ chanel }: Props) => {
  const userId = useAppSelector((state) => state.auth.id)
  const msg = React.useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const handleSend = () => {
    const oldMsg: msgType = {
      type: 'CHAT',
      content: msg.current?.value || '',
      senderId: userId
    }
    const newMsg = toMessageType(oldMsg as msgType, chanel)

    queryClient.setQueryData(['message', userId, chanel], (oldData: any) => {
      if (!oldData) return oldData

      return {
        ...oldData,
        pages: [
          {
            ...oldData.pages[0],
            data: {
              ...oldData.pages[0].data,
              data: [newMsg, ...oldData.pages[0].data.data]
            }
          },
          ...oldData.pages.slice(1)
        ]
      }
    })

    sendMessage(chanel, oldMsg)

    if (msg.current) {
      msg.current.value = ''
    }
  }
  return (
    <div>
      <div className='flex items-center gap-2 px-4 '>
        <div className='px-5 flex-1 '>
          <input ref={msg} type='text' className='bg-gray-200 border w-full rounded-full p-3' placeholder='Message' />
        </div>
        <div onClick={handleSend} className='active:scale-95 transition-all cursor-pointer'>
          <SendHorizontal />
        </div>
      </div>
    </div>
  )
})

export default InputMessage
