import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status:false,
    doctorsList:[]
}

const adminSlice = createSlice({
    name:'Admin',
    initialState,
    reducers:{
        adminLogin:(state,action) => {
            state.status=true,
            state.doctorsList = action.payload.doctors
        },
        adminLogout:(state,action) => {
            state.status=false
            state.doctorsList=[]
        },
        updateDoctorAvailability:(state,action) =>{
            state.doctorsList = state.doctorsList.map((item) =>
            item._id===action.payload._id?{...item,availability:!item.availability}:item)
        }
    }
})

export const {adminLogin,adminLogout,updateDoctorAvailability} = adminSlice.actions

export default adminSlice.reducer


