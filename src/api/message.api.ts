import type { MessageType } from "../types/message.type";
import type { ApiResponse } from "../types/response.type";
import { http } from "./http";

export const MessageAPI = {
  getMsg: (senderId: string, recipentId: string, createAt: string) => http.get<ApiResponse<MessageType[]>>('/message', { params: { senderId, recipentId, createAt } })
}