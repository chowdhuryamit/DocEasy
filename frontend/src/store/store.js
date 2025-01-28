import {configureStore} from "@reduxjs/toolkit"
import authSlice from './authSlice.js'
import doctorSlice from './doctorSlice.js'

const store=configureStore({
  reducer:{
    auth:authSlice,
    doctorsList:doctorSlice
  }
})

export default store