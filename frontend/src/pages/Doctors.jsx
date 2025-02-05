import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Doctors = () => {
  const {speciality} = useParams()
  const [filteredDoc,setFilterDoc]=useState([]);
  const navigate=useNavigate();
  
  const doctors=useSelector((state)=>state.doctorsList.doctors)

  const applyFilter = ()=> {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter();
  },[doctors,speciality])
  
  
  return (
    <div className='m-2'>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button  className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden`}>Filters</button>
        <div className={`flex-col text-sm text-gray-600`}>
          <p onClick={()=>navigate('/doctors')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 m-3 border border-gray-300 rounded transition-all cursor-pointer ${!speciality && 'bg-[#E2E5FF] text-black '}`}>All Doctors</p>
          <p onClick={()=>navigate('/doctors/General physician')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 m-3 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-[#E2E5FF] text-black ' : ''}`}>General physician</p>
          <p onClick={()=> navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 m-3 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Gynecologist</p>
          <p onClick={()=> navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 m-3 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Dermatologist</p>
          <p onClick={()=> navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 m-3 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Pediatricians</p>
          <p onClick={()=> navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 m-3 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Neurologist</p>
          <p onClick={()=> navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 m-3 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
        {
            filteredDoc.map((item,index)=>(
               <div 
               onClick={()=>item.availability? navigate(`/book-appoinments/${item._id}`):alert(`${item.name} is not available`)} 
               className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                key={index}>
                    <img className='bg-[#EAEFFF]' src={item.image} alt="doctor_image" />
                    <div className='p-4'>
                       <div className={`flex items-center gap-2 text-sm text-center ${item.availability? 'text-green-500' :'text-gray-500'}`}>
                         <p className={`w-2 h-2 rounded-full ${item.availability?'bg-green-500':'bg-gray-500'}`}></p>
                         <p>{item.availability?'Available':'Not Available'}</p>
                       </div>
                       <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                       <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                    </div>
               </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors
