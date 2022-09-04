import { configureStore } from '@reduxjs/toolkit'
import appMiddleware from './middlewares/app'
import app from './reducers/app'
import popup from './reducers/popup'

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appMiddleware),
  reducer: {
    app,
    popup
  },
  devTools: true // should be disabled in production in a real app
})
