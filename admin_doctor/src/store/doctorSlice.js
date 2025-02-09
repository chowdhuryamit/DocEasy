import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    doctorData:null
}

const doctorSlice = createSlice({
    name:'Doctor',
    initialState,
    reducers:{
        doctorLogin:(state,action) =>{
            state.status=true,
            state.doctorData=action.payload.doctorData
        },
        doctorLogout:(state,action) =>{
            state.status=false,
            state.doctorData=null
        }
    }
})

export const {doctorLogin,doctorLogout} = doctorSlice.actions

export default doctorSlice.reducer