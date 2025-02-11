import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const adminStatus = useSelector((state) => state.Admin.status)
    if(adminStatus){
      return(
        <div className="ml-5 mt-5 text-5xl font-bold text-primary">
          <p>Wellcome <span className='text-orange-400'>Admin</span> in your Dashboard</p>
        </div>
      )
    }
    else{
      return (
        <div className="ml-5 mt-5 text-5xl font-bold text-primary">
          <p>Wellcome <span className='text-orange-400'>Doctor</span> in your Dashboard</p>
        </div>
      )
    }
}

export default Home
