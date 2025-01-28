import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar,Footer } from './components'
import { doctors } from './assets/assets'
import { useDispatch } from 'react-redux'
import { setDoctors } from './store/doctorSlice'

const App = () => {

  const dispatch=useDispatch();

  useEffect(()=>{
    //api call will done here
     dispatch(setDoctors({doctors}))
  },[])

  return (
      <>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </>
  )
}

export default App
