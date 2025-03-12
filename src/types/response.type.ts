export interface ApiResponse<T> {
  code: number,
  data: T
}

export interface TokenResponse {
  token: string,
  refreshToken: string
}