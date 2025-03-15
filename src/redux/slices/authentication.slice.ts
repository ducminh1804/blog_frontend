import { createSlice } from '@reduxjs/toolkit'
import { getTokenFromLS } from '../../utils/localstore.service'

export interface AuthProps {
  isAuth: boolean,
  username: string,
  id: string
}

const defaultAuth: AuthProps = {
  isAuth: Boolean(getTokenFromLS('token')),
  id: getTokenFromLS('id') || '',
  username: getTokenFromLS('username') || ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: defaultAuth,
  reducers: {
    login: (state, actions) => {
      state.isAuth = true
      state.username = actions.payload.username
      state.id = actions.payload.id
    },
    logout: state => {
      state.isAuth = false
      state.username = ''
    }
  }
})

export const { login, logout, } = authSlice.actions
export default authSlice.reducer
// interface 👉 Dùng cho object structure, kế thừa tốt hơn.
//   type 👉 Dùng cho union, intersection, function type, tuple.
// interface dễ đọc hơn nếu mô tả API hoặc class.
// type mạnh hơn khi cần kiểu phức tạp.
// 🚀 Gợi ý: Nếu đang code TypeScript cho một dự án lớn, dùng interface mặc định và chỉ dùng type khi cần union hoặc tuple!