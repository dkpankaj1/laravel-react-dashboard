import { configureStore } from '@reduxjs/toolkit'
import appReducer from './reduces/appSlice'


export const store = configureStore({
  reducer: {
    app : appReducer,
  },
})