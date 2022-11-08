import { configureStore } from '@reduxjs/toolkit'
import { contentSlice } from './content'

export const store = configureStore({
  reducer: {
    content: contentSlice.reducer,
  },
})
