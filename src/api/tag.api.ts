import type { ApiResponse } from "../types/response.type";
import type { Tag } from "../types/tag.type";
import { http } from "./http";

export const TagAPI = {
  getAll: () => http.get<ApiResponse<Tag[]>>('/tags'),
}