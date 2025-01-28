import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <hr/>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-10 text-sm'>

        <div>
          <a href={'#navbar'}><img className='mb-5 w-40' src={assets.logo} alt="logo" /></a>
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 font-bold'>
            <NavLink to={'/'} className={({isActive}) =>`${isActive?'text-orange-600':'text-gray-500'}`}>Home</NavLink>
            <NavLink to={'/about'} className={({isActive})=>`${isActive?'text-orange-600':'text-gray-500'}`}>About-Us</NavLink>
            <NavLink to={'/contact'} className={({isActive})=>`${isActive?'text-orange-600':'text-gray-500'}`}>Contact-us</NavLink>
            <NavLink to={'/doctors'} className={({isActive})=>`${isActive?'text-orange-600':'text-gray-500'}`}>All-Doctors</NavLink>
            <NavLink to={'/'} className={'text-gray-500'}>Privacy policy</NavLink>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 6909979070</li>
            <li>camit8546@gmail.com</li>
            <div className='flex gap-3'>
            <a target='_blank' className={'h-6 w-6'} href={'https://www.linkedin.com/in/amit-chowdhury-ab505b249/'}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw8QA12qNNp1NhBtubyBce2fCr1FGEK8AGsA&s" alt="linkdin" /></a>
            <a target='_blank' className={'h-6 w-6'} href={'https://github.com/chowdhuryamit'}><img src="https://cdn.worldvectorlogo.com/logos/github-icon-2.svg" alt="github" /></a>
            <a target='_blank' className={'h-6 w-6'} href={'https://leetcode.com/u/camit8546/'}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeJtxeAdUOh58z60mJBZjDLkU5ucuVeHYHtvKja8_i8gI88cB8ouv5vF4U1eKogcDbBVg&usqp=CAU" alt="leetcode" /></a>
            <a target='_blank' className={'h-6 w-6'} href={'https://www.codechef.com/users/camit8546'}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQchiI6Ll4og4gbgdi6NiopCaXiCCU0HJf04w&s" alt="codechef" /></a>
            </div>
            <div className='flex gap-3'>
              <a target='_blank' className={'h-6 w-6'} href={'https://www.geeksforgeeks.org/user/camitztex/'}><img src="https://repository-images.githubusercontent.com/594709571/9a22d4cd-9ac8-48c4-9548-29c9f43f65fb" alt="gfg" className='rounded-md' /></a>
              <a target='_blank' className={'h-6 w-6'} href={'https://www.facebook.com/profile.php?id=100077383411590'}><img src="https://img.icons8.com/?size=512&id=118497&format=png" alt="facebook" /></a>
              <a target='_blank' className={'h-6 w-6'} href={'https://www.instagram.com/amitchowdhury602/'}><img src="https://i.pinimg.com/474x/1e/d6/e0/1ed6e0a9e69176a5fdb7e090a1046b86.jpg" alt="instagram" /></a>
            </div>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 @ DocEasy.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
