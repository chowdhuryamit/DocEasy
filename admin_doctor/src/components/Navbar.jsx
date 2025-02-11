import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assets } from '../assets/assets.js'
import { doctorLogout } from '../store/doctorSlice.js'
import { adminLogout } from '../store/adminSlice.js'

const Navbar = () => {
    const adminStatus = useSelector((state)=>state.Admin.status)
    const dispatch=useDispatch()

    useEffect(()=>{
      if(adminStatus){
        dispatch(doctorLogout())
      }
      else{
        dispatch(adminLogout())
      }
    },[adminStatus])

    const logout = async ()=>{

    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
         <img src={assets.admin_logo} alt="admin_logo" className='w-36 sm:w-40 cursor-pointer' />
         <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{adminStatus?'Admin':'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm px-5 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
