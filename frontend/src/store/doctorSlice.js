import { createSlice } from "@reduxjs/toolkit";

const initialState={
    doctors:[]
}

const doctorSlice=createSlice({
    name:'doctorsList',
    initialState,
    reducers:{
        setDoctors:(state,action)=>{
            action.payload.doctors.map((item)=>(
                state.doctors.push(item)
            ))
        }
    }
})

export const {setDoctors}=doctorSlice.actions
export default doctorSlice.reducer