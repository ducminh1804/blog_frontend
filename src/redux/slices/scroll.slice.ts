import { createSlice } from "@reduxjs/toolkit"

interface ChatProps {
  position: number
}
const defaultChat: ChatProps = {
  position: 0
}
export const scrollSlice = createSlice({
  name: 'scroll',
  initialState: defaultChat,
  reducers: {
    scrolling: (state, action) => {
      state.position = action.payload
    }
  }
})

export const { scrolling } = scrollSlice.actions
export default scrollSlice.reducer
