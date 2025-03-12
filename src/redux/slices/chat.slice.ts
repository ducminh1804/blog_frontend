import { createSlice } from "@reduxjs/toolkit"

interface ChatProps {
  active: boolean
}
const defaultChat: ChatProps = {
  active: false
}
export const chatSlice = createSlice({
  name: 'chat',
  initialState: defaultChat,
  reducers: {
    onChat: (state) => {
      state.active = !state.active
    }
  }
})

export const { onChat } = chatSlice.actions
export default chatSlice.reducer
