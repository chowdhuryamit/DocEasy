import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotfoundPage = () => {
    const navigate=useNavigate();
  return (
    <div className='text-center text-primary'>
      <p className='font-bold text-red-600 mb-2 text-4xl'>404 page not found!!!</p>
      <button onClick={()=>navigate('/')} className='text-primary border-2 rounded border-primary p-1 mb-4 hover:bg-primary hover:text-white'>Go to Home page</button>
    </div>
  )
}

export default NotfoundPage
