import type { Auth, UserInfo } from "../types/auth.type";
import type { ApiResponse } from "../types/response.type";
import { http } from "./http";


export const AuthAPI = {
  loginAccount: (body: Auth) => http.post('/auth/get-token', body),

  getInfo: () => http.get<ApiResponse<UserInfo>>('/auth')
}