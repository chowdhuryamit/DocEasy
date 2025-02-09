import {configureStore} from '@reduxjs/toolkit'
import adminSlice from './adminSlice.js'
import doctorSlice from './doctorSlice.js'

const store = configureStore({
    reducer:{
        admin:adminSlice,
        doctor:doctorSlice
    }
})

export default store