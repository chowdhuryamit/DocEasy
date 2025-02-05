import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar,Footer } from './components'
import { doctors } from './assets/assets'
import { useDispatch } from 'react-redux'
import { setDoctors } from './store/doctorSlice.js'
import axios from 'axios'
import {login,logout} from './store/authSlice.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const dispatch=useDispatch();

  useEffect(()=>{

    axios.get('http://localhost:8000/api/v1/patient/get-patient',{ withCredentials: true })
    .then((patientData)=>{
      
      if(patientData.data.success===false){
        dispatch(logout())
      
        //api call will done here
        dispatch(setDoctors({doctors}))
      }
      else{
        dispatch(login({userData:patientData.data.patientData}))
        dispatch(setDoctors({doctors}))
      }
    })
    .catch((error)=>{
      
      dispatch(logout())
      
      //api call will done here
     dispatch(setDoctors({doctors}))
    })
  },[])

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
