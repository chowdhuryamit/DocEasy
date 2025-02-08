import React from 'react'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  const userData=useSelector((state)=>state.auth.userData)

  console.log(userData);
  
  return (
    <div>
      UserProfile
    </div>
  )
}

export default UserProfile
