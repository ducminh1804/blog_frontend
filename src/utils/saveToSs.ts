import type { PostReponse } from "../types/post.type";

export type KeySs = 'posts'

export const saveToSs = (post: PostReponse, key: KeySs) => {
  const oldData = JSON.parse(sessionStorage.getItem(key) || '[]') as PostReponse[];
  if (oldData.length === 0 || oldData.every(item => item.id != post.id)) {
    const val = [post, ...oldData];
    sessionStorage.setItem('posts', JSON.stringify(val));
  }

};

export const getFromSs = (key: KeySs) => {
  const val = JSON.parse(sessionStorage.getItem(key) || '[]') as PostReponse[]
  return val;
}

export const removeFromSs = (key: KeySs) => {
  sessionStorage.removeItem(key)
  localStorage.removeItem('id')
  localStorage.removeItem('username')
}