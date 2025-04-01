import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const dateFormater = (date)=>{
  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateArray = date.split('_')
  return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
}

const getAppoinments = async (setAppoinments) =>{
  try {
    const {data} = await axios.get('http://localhost:8000/api/v1/patient/get-my-appoinments',{ withCredentials: true })
    if(data.success){
      setAppoinments(data.appoinments.reverse())
    }
    else{
      toast.error(data.msg)
    }
  } catch (error) {
    toast.error('error occured while fetching appoinments details')
  }
}

const handleCancelAppoinment= async (id,setAppoinments) =>{
  try {
    const {data} = await axios.post('http://localhost:8000/api/v1/patient/cancel-appoinment',{appoinmentId:id},{ withCredentials: true })
    if(data.success){
      toast.success(data.msg,{
        onClose:()=>{
          getAppoinments(setAppoinments)
        }
      })
    }
    else{
      toast.error(data.msg)
    }
  } catch (error) {
    
    toast.error('error occured while cancelling appoinment')
  }
}

const UserAppoinments = () => {
  const authStatus = useSelector((state)=>state.auth.status)
  const [appoinments,setAppoinments] = useState([])
  const navigate=useNavigate()


  useEffect(()=>{
    if(authStatus){
      getAppoinments(setAppoinments)
    }
  },[authStatus,appoinments])

  if(appoinments.length>0){
    return(
      <div className="px-10">
        <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b text-center">My appointments</p>

        <div className="flex flex-col items-center">
            {appoinments.map((item, index) => (
           <div key={index} className="flex items-center justify-center gap-6 py-6 border-b w-full max-w-4xl bg-white shadow-lg rounded-lg px-8">
              <div>
               <img className="w-36 h-36 bg-[#EAEFFF] rounded-lg object-cover" src={item.doctor.picture} alt="" />
              </div>

              <div className="text-sm text-[#5E5E5E]">
                <p className="text-[#262626] text-base font-semibold">{item.doctor.name}</p>
                <p>{item.doctor.specialization}</p>
                <p className="text-[#464646] font-medium mt-1">Address:</p>
                <p>{item.doctor.address}</p>
                <p className="mt-1">
                  <span className="text-sm text-[#3C3C3C] font-medium">Date & Time:</span> {dateFormater(item.slot_date)} | {item.slot_time}
                </p>
                <p>
                  <span className="text-sm text-[#3C3C3C] font-medium">Fees: </span>{item.amount}
                </p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                {!item.isCompleted && !item.cancelled && <button onClick={(e)=>navigate('/user/virtual/appointment')} className='sm:min-w-48 py-2 border border-primary rounded text-primary hover:bg-slate-300'>Join</button>}
                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
                {!item.isCompleted && <button className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
                {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appoinment Cancelled</button>}
                {!item.cancelled && !item.isCompleted && <button onClick={(e)=>handleCancelAppoinment(item._id,setAppoinments)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appoinment</button>}
              </div>
            </div>
            ))}
        </div>
     </div>
    )
  }
  else{
    return(
      <div className='font-bold text-primary text-center'>appoinments fetching....</div>
    )
  }
}

export default UserAppoinments
