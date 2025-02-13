import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateDoctorAvailability } from '../../store/adminSlice'

const DoctorsList = () => {
  const doctors =useSelector((state) => state.Admin.doctorsList)

  const dispatch = useDispatch()

  const changeAvailability = async(id)=>{
    try {
      const {data} = await axios.patch('http://localhost:8000/api/v2/admin/change-availability',{},{params: { docId:id },withCredentials: true})
      
      if(data.success){
        toast.success(data.msg,{
          onClose:()=>dispatch(updateDoctorAvailability({_id:id}))
        });
      }
      else{
        toast.error(data.msg)
      }
    } catch (error) {
      toast.error('error occured while updating availability')
    }
  }
  
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item,index)=>(
            <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img src={item.picture} alt="image" className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500'/>
              <div className='p-4'>
                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.specialization}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={(e) =>changeAvailability(item._id)} type="checkbox" checked={item.availability} />
                  <div className={`flex items-center gap-2 text-sm text-center ${item.availability? 'text-green-500' :'text-gray-500'}`}>
                    <p className={`w-2 h-2 rounded-full ${item.availability?'bg-green-500':'bg-gray-500'}`}></p>
                    <p>{item.availability?'Available':'Not Available'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
