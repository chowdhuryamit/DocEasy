import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/store.js'
import {About, Appoinment, Contact, Doctors, Home,Signup, UserAppoinments, UserProfile,NotfoundPage,Ai} from './pages/index.js'

const router=createBrowserRouter([{
  path:'/',
  element:<App/>,
  children:[
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/about',
      element:<About/>
    },
    {
      path:'/contact',
      element:<Contact/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/doctors',
      element:<Doctors/>
    },
    {
      path:'/doctors/:speciality',
      element:<Doctors/>
    },
    {
      path:'/appoinments',
      element:<UserAppoinments/>
    },
    {
      path:'/book-appoinments/:docId',
      element:<Appoinment/>
    },
    {
      path:'/my-profile',
      element:<UserProfile/>
    },
    {
      path:'/ask-ai',
      element:<Ai/>
    },
    {
      path:'/*',
      element:<NotfoundPage/>
    }
  ]
}])


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
