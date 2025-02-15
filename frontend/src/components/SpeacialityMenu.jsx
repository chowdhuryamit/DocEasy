import React from 'react'
import speacialityData from '../assets/assets.js'
import { NavLink } from 'react-router-dom'

const SpeacialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-[#262626]'>
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-lg'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll flex-wrap '>
           {
             speacialityData.map((item,index)=>(
                <NavLink to={`/doctors/${item.speciality}`} onClick={() => scrollTo(0, 0)} key={index} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='w-16 sm:w-24 mb-2 ' src={item.image} alt="image"/>
                    <p>{item.speciality}</p>
                </NavLink>
            ))
           }
        </div>
    </div>
  )
}

export default SpeacialityMenu
