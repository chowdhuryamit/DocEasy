import { createSlice } from "@reduxjs/toolkit";

const initialState={
    doctors:[]
}

const doctorSlice=createSlice({
    name:'doctorsList',
    initialState,
    reducers:{
        setDoctors:(state,action)=>{
            state.doctors=action.payload.doctors
        }
    }
})

export const {setDoctors}=doctorSlice.actions
export default doctorSlice.reducer