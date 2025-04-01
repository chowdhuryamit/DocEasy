import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const Sidebar = () => {
    const adminStatus = useSelector((state)=>state.Admin.status)
    const doctorStatus = useSelector((state)=>state.Doctor.status)
  return (
    <div className='min-h-screen bg-white border-r'>
      {
        adminStatus && <ul className='text-[#515151] mt-5'>
           <NavLink to={'/admin-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-orange-500 font-bold' : ''}`}>
             <img className='min-w-5' src={assets.home_icon} alt="home_icon" />
             <p className='hidden md:block'>Dashboard</p>
           </NavLink>
           <NavLink to={'/all-appoinments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-orange-500 font-bold' : ''}`}>
             <img className='min-w-5' src={assets.appointment_icon} alt="appoinments_icon" />
             <p className='hidden md:block'>Appoinments</p>
           </NavLink>
           <NavLink to={'/add-doctor'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-orange-500 font-bold' : ''}`}>
             <img className='min-w-5' src={assets.add_icon} alt="add_icon" />
             <p className='hidden md:block'>Add Doctor</p>
           </NavLink>
           <NavLink to={'/doctors-list'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-orange-500 font-bold' : ''}`}>
             <img className='min-w-5' src={assets.people_icon} alt="people_icon" />
             <p className='hidden md:block'>Doctors List</p>
           </NavLink>
        </ul>
      }
      {
        doctorStatus && <ul className='text-[#515151] mt-5'>
           <NavLink to={'/doctor-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-orange-500 font-bold' : ''}`}>
             <img className='min-w-5' src={assets.home_icon} alt="home_icon" />
             <p className='hidden md:block'>Dashboard</p>
           </NavLink>
           <NavLink to={'/doctor-appoinments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-orange-500 font-bold' : ''}`}>
             <img className='min-w-5' src={assets.appointment_icon} alt="appoinments_icon" />
             <p className='hidden md:block'>Appoinments</p>
           </NavLink>
           <NavLink to={'/doctor-profile'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-orange-500 font-bold' : ''}`}>
             <img className='min-w-5' src={assets.people_icon} alt="people_icon" />
             <p className='hidden md:block'>Profile</p>
           </NavLink>
           <NavLink to={'/doctor/virtual/appointment/'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-orange-500 font-bold' : ''}`}>
             <img className='min-w-5 h-6 w-6' src={assets.callIcon} alt="people_icon" />
             <p className='hidden md:block'>Start Appointment</p>
           </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
