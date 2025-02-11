import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import {toast} from 'react-toastify'

const Adddoctor = () => {
  const [docImg,setDocImg] = useState(null)
  const [docName,setName] = useState('')
  const [docEmail,setEmail] = useState('')
  const [docPassword,setPassword] = useState('')
  const [docEx,setEx] = useState('')
  const [docFee,setFee] = useState('')
  const [speciality,setSpeciality] = useState('')
  const [degree,setDegree] = useState('')
  const [address ,setAddress] = useState('')
  const [about,setAbout] = useState('')
  const [phone,setPhone] = useState('')

  const handleFormSubmit = async (e)=>{
    e.preventDefault()
    if(!docImg){
      toast.error('please upload doctor image')
    }
    else{
       
    }
  }
  return (
    <form onSubmit={handleFormSubmit} className='m-5 w-full max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg'>
      <p className='mb-4 text-xl font-bold text-primary text-center'>Add Doctor</p>
      
      
      <div className='flex items-center gap-4 mb-8 text-gray-500'>
        <label htmlFor='doc-img' className='cursor-pointer'>
          <img className='w-16 h-16 bg-gray-200 rounded-full object-cover' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt='doctorImg' />
        </label>
        <input onChange={(e) => setDocImg(e.target.files[0])} type='file' id='doc-img' hidden/>
        <p>Upload doctor <br /> picture</p>
      </div>
      
      
      <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
        <div className='w-full lg:flex-1 flex flex-col gap-4'>
          <div className='flex-1 flex flex-col gap-1'>
            <p>Doctor Name</p>
            <input onChange={(e) => setName(e.target.value)} type='text' className='border rounded px-3 py-2 focus:ring focus:ring-primary' value={docName} placeholder='Doctor name' required />
          </div>
          <div className='flex-1 flex flex-col gap-1'>
            <p>Doctor Email</p>
            <input onChange={(e) => setEmail(e.target.value)} type='email' className='border rounded px-3 py-2 focus:ring focus:ring-primary' value={docEmail} placeholder='Doctor Email' required />
          </div>
          <div className='flex-1 flex flex-col gap-1'>
            <p>Doctor Password</p>
            <input onChange={(e) => setPassword(e.target.value)} type='password' className='border rounded px-3 py-2 focus:ring focus:ring-primary' value={docPassword} placeholder='Set doctor password' required />
          </div>
          <div className='flex-1 flex flex-col gap-1'>
            <p>Doctor Experience</p>
            <select onChange={(e) => setEx(e.target.value)} className='border rounded px-3 py-2 focus:ring focus:ring-primary' value={docEx} required>
              <option value="1 years">1 years</option>
              <option value="2 years">2 years</option>
              <option value="3 years">3 years</option>
              <option value="4 years">4 years</option>
              <option value="5 years">5 years</option>
              <option value="6 years">6 years</option>
              <option value="7 years">7 years</option>
              <option value="8 years">8 years</option>
              <option value="9 years">9 years</option>
              <option value="10 years">10 years</option>
            </select>
          </div>
          <div className='flex-1 flex flex-col gap-1'>
            <p>Fees</p>
            <input onChange={(e) => setFee(e.target.value)} type='number' className='border rounded px-3 py-2 focus:ring focus:ring-primary' value={docFee} placeholder='Set doctor fee' required />
          </div>
        </div>
        <div className='w-full lg:flex-1 flex flex-col gap-4'>
          <div className='flex-1 flex flex-col gap-1'>
            <p>Speciality</p>
            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-2 py-2 focus:ring focus:ring-primary' required>
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>

            </select>
          </div>
          <div className='flex-1 flex flex-col gap-1'>
            <p>Contact Number</p>
            <input onChange={(e) => setPhone(e.target.value)} type='text' className='border rounded px-3 py-2 focus:ring focus:ring-primary' value={phone} placeholder='contact number' required />
          </div>
          <div className='flex-1 flex flex-col gap-1'>
            <p>Degree</p>
            <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2 focus:ring focus:ring-primary' type='text' placeholder='Degree' required />
          </div>
          <div className='flex-1 flex flex-col gap-1'>
            <p>Address</p>
            <input onChange={(e) => setAddress(e.target.value)} value={address} className='border rounded px-3 py-2 focus:ring focus:ring-primary' type='text' placeholder='Address' required />
          </div>
        </div>
      </div>

      
      <div className='mt-4'>
        <p className='mb-2'>About Doctor</p>
        <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded focus:ring focus:ring-primary' rows={5} placeholder='Write about doctor'></textarea>
      </div>
      
      <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full hover:bg-primary-dark transition'>Add doctor</button>
    </form>
  )
}

export default Adddoctor
