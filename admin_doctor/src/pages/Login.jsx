import React, { useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux';
import { adminLogin } from '../store/adminSlice';
import { useNavigate } from 'react-router-dom';

const fetchDoctorsDataForAdmin = async (dispatch,navigate)=>{
  try {
    const {data} = await axios.get('http://localhost:8000/api/v2/admin/get-doctors',{ withCredentials: true })
    if(data.success){
       toast.success(data.msg,{
        onClose:() =>{
          dispatch(adminLogin({doctors:data.doctors}))
          navigate('/')
        }
       })
    }
    else{
      toast.error(data.msg,{
        onClose:() =>{
          dispatch(adminLogin({doctors:[]}))
          navigate('/')
        }
      })
    }
  } catch (error) {
    toast.error('error occured while fetching doctors information',{
      onClose:() =>{
        dispatch(adminLogin({doctors:[]}))
        navigate('/')
      }
    })
  }
}

const Login = () => {
    const [state,setState] = useState('Admin')
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlesubmit = async (e) =>{
      e.preventDefault()
      if(state === 'Admin'){
        try {
          const {data} = await axios.post('http://localhost:8000/api/v2/admin/login',{email,password},{ withCredentials: true })
          
          if(data.success){
            setEmail('')
            setPassword('')
            toast.success(data.msg, {
              onClose: () =>{
                fetchDoctorsDataForAdmin(dispatch,navigate)
              }
            });
          }
          else{
            setEmail('')
            setPassword('')
            toast.error(data.msg)
          }
        } catch (error) {
          setEmail('')
          setPassword('')
          toast.error('network error please try again')
        }
      }
      else{

      }
    }
    
  return (
    <form onSubmit={handlesubmit} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary text'>{state}</span> Login</p>
        <div className='w-full '>
          <p>Email : </p>
          <input onChange={(e) =>setEmail(e.target.value)} type="email" className='border border-[#DADADA] rounded w-full p-2 mt-1' value={email} required/>
        </div>
        <div className='w-full '>
          <p>Password : </p>
          <input onChange={(e) =>setPassword(e.target.value)} type="password" className='border border-[#DADADA] rounded w-full p-2 mt-1' value={password} required/>
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
        {
          state === 'Admin'
          ?  <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
          :  <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
