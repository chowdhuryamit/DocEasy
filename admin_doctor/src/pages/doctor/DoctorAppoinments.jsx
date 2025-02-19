import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import dateFormater from '../dateFormater'
import {assets} from '../../assets/assets.js'


const DoctorAppoinments = () => {
  const [appoinments,setAppoinments] = useState([])
  const [page,setPage] = useState(1)
  const [serial,setSerial] = useState(1)
  const [totalPages,setTotalPages] = useState(0)

  const getAllAppoinments = async ()=>{
    try {
      const {data} = await axios.get('http://localhost:8000/api/v3/doctor/get-appoinments',{params: { page:page },withCredentials: true})

      if(data.success){
        setAppoinments(data.appoinments)
        setTotalPages(data.totalPages)
      }
      else{
        toast.warn(data,msg)
      }
    } catch (error) {
      toast.error('error occured while fetching appoinments deatils')
    }
  }

  const cancelAppointment = async (id)=>{
    try {
      const {data} = await axios.patch('http://localhost:8000/api/v3/doctor/cancel-appoinment',{appoinmentId:id},{ withCredentials: true })
      if(data.success){
        toast.success(data.msg,{
          onClose:()=>{
            getAllAppoinments()
          }
        })
      }
      else{
        toast.warn(data.msg)
      }
    } catch (error) {
      toast.error('error occured while cancelling appoinment')
    }
  }

  const completeAppointment = async (id)=>{
    try {
      const {data} = await axios.patch('http://localhost:8000/api/v3/doctor/complete-appoinment',{appoinmentId:id},{ withCredentials: true })
      
      if(data.success){
        toast.success(data.msg,{
          onClose:()=>{
            getAllAppoinments()
          }
        })
      }
      else{
        toast.warn(data.msg)
      }
    } catch (error) {
      toast.error('error occured while updating appoinment status')
    }
  }


  useEffect(()=>{
    getAllAppoinments()
  },[page])

  if(appoinments?.length==0)
    return( <p className="flex text-center text-primary">
     Featching Appoinments details...
     </p>)
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
    <p className="mb-4 text-lg font-semibold text-gray-800">All Appointments</p>

    <div className="bg-white border rounded-lg shadow-md text-sm overflow-x-auto">
      <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1.5fr_2fr_1fr_1fr_1fr] py-3 px-6 border-b bg-gray-100 font-semibold text-gray-700">
        <p>SL</p>
        <p>Patient</p>
        <p>Date & Time</p>
        <p>Fees</p>
        <p>Payment</p>
        <p>Action</p>
      </div>

      {appoinments?.map((appointment, index) => (
        <div
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1.5fr_2fr_1fr_1fr_1fr] items-center gap-x-4 py-3 px-4 border-b hover:bg-gray-50"
          key={index}
        >
          <p className="hidden sm:block">{serial + index}</p>

          <div className="flex items-center gap-3">
            <img src={appointment.patient[0].photo} className="w-8 h-8 rounded-full" alt="Patient" />
            <p className="text-gray-700 font-medium">{appointment.patient[0].name}</p>
          </div>

          <p className="text-gray-600">{dateFormater(appointment.slot_date)}, {appointment.slot_time}</p>


          <p className="text-gray-800 font-semibold">₹ {appointment.amount}</p>
          
          <div className="flex items-center gap-3">
            {
              appointment.payment?
              <p className='text-xs text-white bg-green-600 font-bold inline border px-2 rounded-full'>Done</p>:
              appointment.cancelled?<p className='text-xs text-white bg-gray-700 font-bold inline border px-2 rounded-full'>N/A</p>:
              <p className='text-xs inline border text-white bg-orange-600 font-bold px-2 rounded-full'>Pending</p>
            }
          </div>
          {
            appointment.cancelled ?
            <p className='text-red-400 text-xs font-medium'>Cancelled</p>:
            appointment.isCompleted ?<p className='text-green-500 text-xs font-medium'>Completed</p> :
            <div className='flex'>
              <img onClick={() => cancelAppointment(appointment._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
              <img onClick={() => completeAppointment(appointment._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
            </div>
          }
        </div>
      ))}
    </div>

    <div className="flex justify-end mt-4 gap-2">
      <button
        onClick={()=>{
          if(page>1){
            setPage(page-1);
            setSerial((prevSerial) => prevSerial - 5);
          }
        }}
        disabled={page === 1}
        className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={()=>{
          setPage(page+1);
          setSerial((prevSerial) => prevSerial + 5);
        }}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
  )
}

export default DoctorAppoinments
