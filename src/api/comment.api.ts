import type { CommentResponse } from "../types/comment.type";
import type { ApiResponse } from "../types/response.type";
import { http } from "./http";

export const CommentAPI = {
  getComments: (postId: string, parentId: number = 0, page: number = 0, size: number = 2) =>
    http.get<ApiResponse<CommentResponse>>(`/comments/${postId}`, { params: { parentId, page, size } }),

  checkReplys: (parentId: number) =>
    http.get<ApiResponse<number>>(`comments/flag/${parentId}`)
}