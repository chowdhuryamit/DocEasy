import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Login } from './pages/index.js';
import {Navbar,Sidebar} from './components/index.js';
import 'react-toastify/dist/ReactToastify.css';

function App() { 

  const adminStatus=useSelector((state)=>state.Admin.status)
  const doctorStatus=useSelector((state)=>state.Doctor.status)

  if(adminStatus || doctorStatus){
    return (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar/>
        <div className='flex items-start'>
          <Sidebar/>
          <Outlet/>
        </div>
      </div>
    )
  }
  else{
    return (
      <>
       <ToastContainer/>
       <Login/>
      </>
    )
  }
}

export default App
