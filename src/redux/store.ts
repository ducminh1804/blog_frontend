import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authentication.slice'
import { chatSlice } from './slices/chat.slice'
import { scrollSlice } from './slices/scroll.slice'
// ...

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
    scroll: scrollSlice.reducer
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store