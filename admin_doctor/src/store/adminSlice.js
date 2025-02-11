import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status:false,
}

const adminSlice = createSlice({
    name:'Admin',
    initialState,
    reducers:{
        adminLogin:(state,action) => {
            state.status=true
        },
        adminLogout:(state,action) => {
            state.status=false
        }
    }
})

export const {adminLogin,adminLogout} = adminSlice.actions

export default adminSlice.reducer


