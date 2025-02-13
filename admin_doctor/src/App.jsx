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
      dispatch(adminLogin({doctors:data.doctors}));
      dispatch(doctorLogout());  
    }
    else{
      dispatch(adminLogin({doctors:[]}));
      dispatch(doctorLogout());
    }
  } catch (error) {
    dispatch(adminLogin({doctors:[]}));
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

function App() { 
  const dispatch = useDispatch()
  const adminStatus = useSelector((state) => state.Admin.status)
  const doctorStatus = useSelector((state) => state.Doctor.status)

  useEffect(()=>{
    if(!adminStatus){
      fetchAdminStatus(dispatch)
    }
  },[dispatch,adminStatus])

  // useEffect(()=>{
  //   fetchDoctorStatus()
  // },[use])
  

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
