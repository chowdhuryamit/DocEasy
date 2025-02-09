import {configureStore} from '@reduxjs/toolkit'
import adminSlice from './adminSlice.js'
import doctorSlice from './doctorSlice.js'

const store = configureStore({
    reducer:{
        Admin:adminSlice,
        Doctor:doctorSlice
    }
})

export default store