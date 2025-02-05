import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice.js';


const Signup = () => {

  const [state,setState]=useState('signup');
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [password,setPassword]=useState('');

  const navigate=useNavigate();
  const dispatch=useDispatch();
  

  const onSubmitHandler=async(e)=>{
     e.preventDefault()

     if(state==='signup'){
        try {
          
          const {data}  = await axios.post('http://localhost:8000/api/v1/patient/create-account',{name,phone,password},{ withCredentials: true })
          
          if(data.success===false){
            setName('')
            setPhone('')
            setPassword('')
            toast.error(data.msg)
          }
          else{
            toast.success(data.msg)
            setState('login')
          }
        } catch (error) {
          setName('')
          setPhone('')
          setPassword('')
          toast.error('network error.try again');
        }
     }
     else{
        try {
           const {data}=await axios.post('http://localhost:8000/api/v1/patient/login',{phone,password},{ withCredentials: true })
    
           if(data.success==false){
            toast.error(data.msg)
           }
           else{
            setName('')
            setPhone('')
            setPassword('')
            dispatch(login({userData:data.loggedInPatient}))
            toast.success(data.msg, {
              onClose: () => navigate('/')
            });
           }
        } catch (error) {
          toast.error('network error.try again')
        }
     }
  }
  return (
    <>
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center shadow-xl'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold text-primary'>{state === 'signup' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'signup' ? 'sign up' : 'log in'} to book an appointment</p>
        {
          state === 'signup'?
          <div className='w-full '>
            <p>Full Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
          </div> :null
        }
        <div className='w-full '>
          <p>Contact No</p>
          <input onChange={(e) => setPhone(e.target.value)} value={phone} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>{state === 'signup' ? 'Create account' : 'Login'}</button>
        {state === 'signup'
          ? <p>Already have an account? <span onClick={() => setState('login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create an new account? <span onClick={() => setState('signup')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
    </>
  )
}

export default Signup
