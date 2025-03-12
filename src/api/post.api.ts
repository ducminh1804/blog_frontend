import type { PostReponse } from "../types/post.type";
import type { ApiResponse } from "../types/response.type";
import { http } from "./http";


//to chuc dang obj: key-val
// PostAPI {
//  key:getPosts:
//  val : (createAt: string) => http.get<ApiResponse<PostReponse[]>>('/post', { params: { createAt } }
//  }
export const PostAPI = {
  getPosts: (createAt: string) => http.get<ApiResponse<PostReponse[]>>('/post', { params: { createAt } }),

  getPostById: (postId: string) => http.get<ApiResponse<PostReponse>>(`/post/${postId}`)

}