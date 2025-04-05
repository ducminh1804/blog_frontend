import { useQuery } from '@tanstack/react-query'
import { getFromSs } from '../../utils/saveToSs'
import History from './History/History'
import { Trans, useTranslation } from 'react-i18next'
import type { Lng } from '../../types/lng.type'
import useLng from '../../hooks/useLng'
export default function HistoryList() {
  const posts = getFromSs('posts')

  return (
    <div>
      <span className='font-bold text-xs'>
        {
          useLng({ lng: 'recentPosts', toLng: 'RECENT POSTS' })
        }
      </span>

      {posts.map((item) => {
        return <History key={item.id} item={item} />
      })}
    </div>
  )
}
