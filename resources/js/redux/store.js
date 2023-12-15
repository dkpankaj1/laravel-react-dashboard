import { configureStore } from '@reduxjs/toolkit'
import appReducer from './reduces/appSlice'
import authReducer from './reduces/authSlice'


export const store = configureStore({
  reducer: {
    app : appReducer,
    auth : authReducer
  },
})