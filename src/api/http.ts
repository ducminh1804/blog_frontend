import axios from 'axios'
import { clearLS, setTokenToLS, type KeyToken } from '../utils/localstore.service'
import type { ApiResponse, TokenResponse } from '../types/response.type'
export const http = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 10000,
  headers: {
    Accept: 'application/json'
  }
})

http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  function (response) {
    const { url } = response.config
    if (url === '/auth/get-token') {
      const { token, refreshToken } = (response.data as ApiResponse<TokenResponse>).data;
      setTokenToLS('token', token)
      setTokenToLS('refreshToken', refreshToken)
      console.log(token, refreshToken)
    } else if (url === '/logout') {
      clearLS();
    }
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      clearLS()
      window.location.href = '/login'
    }
    return Promise.reject(error);
  },
)


// AxiosResponse < T, D > {
//   "data": {
//     "my_data": true
//   },
//   "status": 200,
//   "statusText": "SUCCESS",
//   "headers": {
//     "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
//     "content-type": "application/json",
//     "expires": "0",
//     "pragma": "no-cache"
//   },
//   "config": {
//     "transitional": {
//       "silentJSONParsing": true,
//       "forcedJSONParsing": true,
//       "clarifyTimeoutError": false
//     },
//     "adapter": ["xhr", "http"],
//     "transformRequest": [null],
//     "transformResponse": [null],
//     "timeout": 0,
//     "xsrfCookieName": "XSRF-TOKEN",
//     "xsrfHeaderName": "X-XSRF-TOKEN",
//     "maxContentLength": -1,
//     "maxBodyLength": -1,
//     "env": {},
//     "headers": {
//       "Accept": "application/json, text/plain, */*",
//       "Authorization": "Bearer ...token..."
//     },
//     "method": "get",
//     "url": "codestus.com"
//   },
//   "request": {}
// }