import type { PostReponse } from "../types/post.type";
import type { ApiResponse } from "../types/response.type";
import { http } from "./http";


//to chuc dang obj: key-val
// PostAPI {
//  key:getPosts:
//  val : (createAt: string) => http.get<ApiResponse<PostReponse[]>>('/post', { params: { createAt } }
//  }

export type MediaType = {
  title: string,
  kind: 'image' | 'video',
  tags: string,
  file: File,
}

export const PostAPI = {
  getPosts: (createAt: string) => http.get<ApiResponse<PostReponse[]>>('/post', { params: { createAt } }),

  getPostById: (postId: string) => http.get<ApiResponse<PostReponse>>(`/post/${postId}`),

  createPostMedia: (data: MediaType) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('kind', data.kind)
    formData.append('tags', data.tags)
    formData.append('file', data.file)
    return http.post<ApiResponse<PostReponse>>('/post/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  getSimilarPosts: (title: string) => {
    return http.get<ApiResponse<PostReponse[]>>('/post/similar', {
      params: { title }
    })
  }

}