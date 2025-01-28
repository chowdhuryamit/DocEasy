import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const navigate=useNavigate();
  const authStatus=useSelector((state)=>state.auth.status);
  const dispatch=useDispatch();

  const userLogout=()=>{
     //apicall
    //  .then(()=>{
    //   dispatch(logout())
    //   navigate('/')
    //  })
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]' id='navbar'>
      <img src={assets.logo} alt='logo' className='w-44 cursor-pointer' to={'/'}/>
      <ul className='md:flex items-start gap-8 font-medium hidden'>
        <NavLink to={'/'} className={({isActive}) =>`${isActive?'text-orange-500':'text-primary'} hover:text-orange-500 duration-300`}>
          <li className='py-1'>HOME</li>
        </NavLink>
        <NavLink to={'/doctors'} className={({isActive}) =>`${isActive?'text-orange-500':'text-primary'} hover:text-orange-500 duration-300`}>
          <li className='py-1'>ALL-DOCTORS</li>
        </NavLink>
        <NavLink to={'/about'} className={({isActive}) =>`${isActive?'text-orange-500':'text-primary'} hover:text-orange-500 duration-300`}>
          <li className='py-1'>ABOUT-US</li>
        </NavLink>
        <NavLink to={'/contact'} className={({isActive}) =>`${isActive?'text-orange-500':'text-primary'} hover:text-orange-500 duration-300`}>
          <li className='py-1'>CONTACT-US</li>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4 '>
        {authStatus===true
        ?<div className='flex items-center gap-2 cursor-pointer group relative'>
          <img className='w-8 rounded-full' src={assets.profile_pic} alt="profile_picture" />
          <img className='w-2.5' src={assets.dropdown_icon} alt="dropdown_icon" />
          <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
            <div className='min-w-48 rounded flex flex-col gap-4 p-4 bg-gray-300'>
              <NavLink to={'/my-profile'} className='hover:text-black'>My-Profile</NavLink>
              <NavLink to={'/appoinments'} className='hover:text-black'>My-Appoinments</NavLink>
              <p className='hover:text-black' onClick={userLogout}>Logout</p>
            </div>
          </div>
        </div>
        :<button onClick={()=>navigate('/login')} className='bg-primary text-white font-bold px-8 py-3 rounded-full hidden md:block'>Create Account</button>}
      </div>
    </div>
  )
}

export default Navbar
