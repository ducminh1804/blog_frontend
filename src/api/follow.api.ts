import type { Follow } from "../types/follow.type";
import type { ApiResponse } from "../types/response.type";
import { http } from "./http";

export const FollowAPI = {
  getAll: () => http.get<ApiResponse<Follow[]>>('/follows')
}


