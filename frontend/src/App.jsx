import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar,Footer } from './components'
import { useDispatch } from 'react-redux'
import { setDoctors } from './store/doctorSlice.js'
import axios from 'axios'
import {login,logout} from './store/authSlice.js'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetchDoctors = async (dispatch)=>{
  try {
    const {data} = await axios.get('http://localhost:8000/api/v1/patient/get-doctor',{ withCredentials: true })
    if(data.success){
      dispatch(setDoctors({doctors:data.doctors}))
    }
    else{
      toast.error(data.msg)
    }
  } catch (error) {
    toast.error('error occured while fetching doctor information for patient')
  }
}

const fetchUser = async (dispatch)=>{
  try {
    const {data} =await axios.get('http://localhost:8000/api/v1/patient/get-patient',{ withCredentials: true })

    if(data.success){
      fetchDoctors(dispatch)
      dispatch(login({userData:data.patientData}))
    }
    else{
      dispatch(logout())
      fetchDoctors(dispatch)
    }
  } catch (error) {
    fetchDoctors(dispatch)
    dispatch(logout())
  }
}


const App = () => {

  const dispatch=useDispatch();

  useEffect(()=>{
    fetchUser(dispatch)
  },[dispatch])

  return (
      <>
      <ToastContainer/>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </>
  )
}

export default App
