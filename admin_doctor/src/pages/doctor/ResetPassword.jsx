import React from 'react'
import { useState } from 'react';
import { useParams} from 'react-router-dom';
import {toast} from 'react-toastify'
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      
      const {data} = await axios.post('http://localhost:8000/api/v3/doctor/reset-password', {
        token,
        password,
      });
      if(data.success){
        toast.success(`${data.msg} go to login page and login with new password`,{
          onClose:()=>{
            window.close()
          }
        })
      }
      else{
        toast.warn(data.msg)
      }
    } catch (error) {
      console.log(error);
      
      toast.error('something went wrong while updating password')
    }
  };
  return (
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'>Reset <span className='text-primary text'> Password</span></p>
        <div className='w-full '>
          <input onChange={(e) =>setPassword(e.target.value)} placeholder='new password' type="password" className='border border-[#DADADA] rounded w-full p-2 mt-1' value={password} required/>
        </div>
        <div className='w-full '>
          <input onChange={(e) =>setConfirmPassword(e.target.value)} placeholder='confirm password' type="password" className='border border-[#DADADA] rounded w-full p-2 mt-1' value={confirmPassword} required/>
        </div>
        {
          message && <p className='text-red-500'>{message}</p>
        }
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Submit</button>
      </div>
    </form>
  )
}

export default ResetPassword
