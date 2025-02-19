import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Login } from './pages/index.js';
import {Navbar,Sidebar} from './components/index.js';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { adminLogin,adminLogout } from './store/adminSlice.js';
import { doctorLogin,doctorLogout } from './store/doctorSlice.js';

const fetchDoctorDataForadmin = async (dispatch)=>{
  try {
    const {data} = await axios.get('http://localhost:8000/api/v2/admin/get-doctors',{ withCredentials: true })

    if(data.success){
      toast.success(data.msg,{
        onClose:()=>{
          dispatch(adminLogin({doctors:data.doctors}));
          dispatch(doctorLogout());
        }
      })  
    }
    else{
      toast.warn(data.msg,{
        onClose:()=>{
          dispatch(adminLogout());
          dispatch(doctorLogout());
        }
      })
    }
  } catch (error) {
    dispatch(adminLogout());
    dispatch(doctorLogout());
  }
}

const fetchAdminStatus = async (dispatch)=>{
  
  try {
    const { data } = await axios.get('http://localhost:8000/api/v2/admin/get-admin',{ withCredentials: true });
    if (data.success) {
      fetchDoctorDataForadmin(dispatch)
    } else {
      dispatch(adminLogout());
    }
  } catch (error) {
    dispatch(adminLogout());
    toast.error('Error occurred while fetching admin information');
  }
}

const fetchDoctorStatus = async (dispatch)=>{
  try {
    const {data} = await axios.get('http://localhost:8000/api/v3/doctor/get-doctor',{withCredentials:true})

    if(data.success){
      toast.success(data.msg,{
        onClose:()=>{
          dispatch(doctorLogin({doctorData:data.doctor}));
          dispatch(adminLogout())
        }
      })
    }
    else{
      toast.warn(data.mag,{
        onClose:()=>{
          dispatch(doctorLogout());
          dispatch(adminLogout());
        }
      })
    }
  } catch (error) {
    dispatch(doctorLogout());
    dispatch(adminLogout());
  }
}

function App() { 
  const dispatch = useDispatch()
  const adminStatus = useSelector((state) => state.Admin.status)
  const doctorStatus = useSelector((state) => state.Doctor.status)

  useEffect(()=>{
    if(!adminStatus && !doctorStatus){
      fetchAdminStatus(dispatch)
    }
  },[])

  useEffect(()=>{
    if(!doctorStatus && !adminStatus){
       fetchDoctorStatus(dispatch)
    }
  },[])
  

  if(adminStatus || doctorStatus){
    return (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar/>
        <div className='flex items-start'>
          <Sidebar/>
          <Outlet/>
        </div>
      </div>
    )
  }
  else{
    return (
      <>
       <ToastContainer/>
       <Login/>
      </>
    )
  }
}

export default App
