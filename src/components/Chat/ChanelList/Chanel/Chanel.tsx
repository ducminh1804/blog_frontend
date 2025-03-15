import type { Follow } from '../../../../types/follow.type'

interface Props {
  item: Follow
}
export default function Chanel({ item }: Props) {
  return (
    <div className='bg-blue-950 p-2 rounded-lg mt-1'>
      <div className='flex gap-2 cursor-pointer'>
        <div>
          <img
            className='w-8 h-8 object-cover rounded-full'
            src='https://styles.redditmedia.com/t5_bbqyei/styles/communityIcon_y1rxbaegsxfd1.png'
            alt=''
          />
        </div>
        <div className='flex flex-col text-white'>
          <span className='font-sans  opacity-80 text-[12px] font-bold'>{item.username}</span>
          <span className='text-[11px]'>Tin nhan tam thoi...</span>
        </div>
      </div>
    </div>
  )
}
