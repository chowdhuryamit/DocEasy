import React from 'react'
import { Banner, Header, SpeacialityMenu, TopDoctors } from '../components/index'
import { useSelector } from 'react-redux'

const Home = () => {
   const status=useSelector((state)=>state.auth.status)
   
  return (
    <div>
      <Header/>
      <SpeacialityMenu/>
      <TopDoctors/>
      {!status && <Banner/>}
    </div>
  )
}

export default Home
