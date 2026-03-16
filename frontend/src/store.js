import { configureStore } from '@reduxjs/toolkit'
import { serviceListReducer } from './reducers/serviceReducers'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
}

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    serviceList: serviceListReducer
  },
  preloadedState: initialState,
  // DevTools and Thunk are enabled automatically!
})

export default store