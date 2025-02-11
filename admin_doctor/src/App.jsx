import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Login } from './pages/index.js';
import {Navbar,Sidebar} from './components/index.js';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { adminLogin,adminLogout } from './store/adminSlice.js';
import { doctorLogin,doctorLogout } from './store/doctorSlice.js';

function App() { 
  const dispatch = useDispatch()

  const adminStatus=useSelector((state)=>state.Admin.status)
  const doctorStatus=useSelector((state)=>state.Doctor.status)

  useEffect(()=>{
    const fetchAdminStatus = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/v2/admin/get-admin',{},{ withCredentials: true });
        if (data.success) {
          dispatch(adminLogin());
          dispatch(doctorLogout());  // Ensure only one is active
        } else {
          dispatch(adminLogout());
        }
      } catch (error) {
        dispatch(adminLogout());
        toast.error('Error occurred while fetching admin information');
      }
    };

    fetchAdminStatus();
  },[dispatch])

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
