import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux'
import React from 'react'
import store from './store/store.js'
import { RouterProvider } from 'react-router-dom'
import {createBrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import { Adddoctor, AllAppoinments, Dashboard, DoctorAppoinments, DoctorDashboard, DoctorProfile, DoctorsList,DoctorDetails,ResetPassword } from './pages/index.js'
import {Home} from './components/index.js'
import { ToastContainer } from 'react-toastify';
import Lobby from './screens/Lobby.jsx'
import Room from './screens/Room.jsx'

const router = createBrowserRouter([{
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/admin-dashboard',
        element:<Dashboard/>
      },
      {
        path:'/doctor-dashboard',
        element:<DoctorDashboard/>
      },
      {
        path:'/add-doctor',
        element:<Adddoctor/>
      },
      {
        path:'/doctors-list',
        element:<DoctorsList/>
      },
      {
        path:'/all-appoinments',
        element:<AllAppoinments/>
      },
      {
        path:'/doctor-details/:docId',
        element:<DoctorDetails/>
      },
      {
        path:'/doctor-profile',
        element:<DoctorProfile/>
      },
      {
        path:'/doctor-appoinments',
        element:<DoctorAppoinments/>
      },
      {
        path:'/doctor/virtual/appointment/',
        element:<Lobby/>
      },
      {
        path:'/doctor/virtual/appointment/:roomId',
        element:<Room/>
      }
    ]
},
{
  path:'/reset-password/doctor/:token',
  element:<><ToastContainer/><ResetPassword/></>
}
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
