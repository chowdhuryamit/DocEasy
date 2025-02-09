import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { assets } from '../assets/assets'

const UserProfile = () => {

  const [isEdit,setIsEdit]=useState(false)
  const [userStateDate,setUserStateData]=useState({
      name: "",
      image: assets.profile_pic,
      email: "",
      phone: "",
      address: "",
      gender: "",
      dob: "",
  })

  const userData=useSelector((state)=>state.auth.userData)

  const updateUserProfileData = async ()=>{
     //update user profile information
     
     
     setIsEdit(false)
  }

 useEffect(()=>{
   if(userData){
    setUserStateData({
      name:userData.name,
      image:userData.image?userData.image:assets.profile_pic,
      email:userData.email?userData.email:'Not Provided',
      phone:userData.phone,
      address:userData.address?userData.address:'Not Provided',
      gender:userData.gender?userData.gender:'Not Provided',
      dob:userData.dob?userData.dob:''
     })
   }
 },[userData])
  
  
  
  if(userData){
    
    return(
      <div className="flex justify-center px-4">
      <div className="max-w-lg w-full flex flex-col gap-2 text-sm pt-5 p-6 rounded-lg">
        <div className="flex flex-col items-center">
          <div className="inline-block relative cursor-pointer my-2">
            <img className="w-36 h-36 object-cover rounded-full shadow-md" src={userStateDate.image} alt="profile_pic" />
          </div>
          {isEdit ? (
            <input
              type="text"
              className="bg-gray-200 text-3xl font-medium w-full max-w-[250px] my-2 rounded-xl p-2 text-center"
              onChange={(e) => setUserStateData((prev) => ({ ...prev, name: e.target.value }))}
              value={userStateDate.name}
            />
          ) : (
            <p className="font-medium text-3xl text-[#262626] my-2">{userStateDate.name}</p>
          )}
        </div>

        <hr className="bg-gray-300 h-[1px] border-none my-2" />
        <div>
          <p className="text-gray-600 underline my-2">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
            <p className="font-medium my-2">Phone no:</p>
            <p className="text-blue-500 my-2">{userStateDate.phone}</p>

            <p className="font-medium my-2">Email Id:</p>
            {isEdit ? (
              <input
                type="text"
                className="bg-gray-200 max-w-52 my-2 rounded-xl p-2"
                value={userStateDate.email}
                onChange={(e) => setUserStateData((prev) => ({ ...prev, email: e.target.value }))}
              />
            ) : (
              <p className="text-blue-500 my-2">{userStateDate.email}</p>
            )}

            <p className="font-medium my-2">Address:</p>
            {isEdit ? (
              <input
                type="text"
                className="bg-gray-200 my-2 rounded-xl p-2"
                value={userStateDate.address}
                onChange={(e) => setUserStateData((prev) => ({ ...prev, address: e.target.value }))}
              />
            ) : (
              <p className="text-gray-500 my-2">{userStateDate.address}</p>
            )}
          </div>
        </div>

        <div>
          <p className="text-[#797979] underline my-2">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
            <p className="font-medium my-2">Gender:</p>
            {isEdit ? (
              <select
                className="max-w-20 bg-gray-200 my-2 rounded-xl p-2"
                onChange={(e) => setUserStateData((prev) => ({ ...prev, gender: e.target.value }))}
                value={userStateDate.gender}
              >
                <option value="Not selected">Not selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-500 my-2">{userStateDate.gender}</p>
            )}

            <p className="font-medium my-2">DOB: </p>
            {isEdit ? (
              <input
                type="date"
                className="max-w-28 bg-gray-200 my-2 rounded-xl p-2"
                value={userStateDate.dob}
                onChange={(e) => setUserStateData((prev) => ({ ...prev, dob: e.target.value }))}
              />
            ) : (
              <p className="text-gray-500 my-2">{userStateDate.dob || "Not provided"}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all mb-7"
            >
              Save information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all mb-7"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
    )
  }
  else{
    return(
      <div className='flex text-center text-primary font-bold justify-center my-5'>Please Login </div>
    )
  }
}

export default UserProfile
