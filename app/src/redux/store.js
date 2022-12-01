import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import blogReducer from '../reducer/blogReducer'
import userReducer from '../reducer/userReducer'
import alertReducer from '../reducer/notificationReducer'
const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  notification: alertReducer
})
const store = configureStore({
  reducer,
  middleware: [thunk],
  devTools: true
})

export default store
