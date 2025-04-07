import React, { useContext, useState } from 'react'
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Navbar = () => {



  const { user, credits, setUser, setCredits, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    setCredits(null);
  }

  const logoutHandler = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/user/logout', {}, {
        withCredentials: true
      });
      if (response.data.success) {
        logout();
        navigate('/');
        console.log('User logged out successfully');
      }
      else {
        console.log('Logout failed');
      }
    } catch (err) {
      console.error('Logout error: ', err)
    }
  }

  return (
    <div className='flex flex-col justify-center '>
      <div className='py-2 flex justify-between px-28'>
        <div className='flex gap-6 items-center text-xl font-semibold italic'>
          <Link to='/'>
            <img src={assets.logo} alt="" className='w-16 filter invert' />
          </Link>
          <p className='text-neutral-200'>{`Hello ${user}`}</p>
        </div>
        <div>
          {user ?
            <div className='flex gap-4 mt-3 items-center'>
              <NavLink to={'/buy'}>
                <button className='flex gap-2 items-center bg-neutral-200 p-2 rounded-full border-3 border-black font-semibold cursor-pointer'>
                  <p>{`Credits left: ${credits}`}</p>
                  <img src={assets.star} alt="" className='w-5' />
                </button>
              </NavLink>
              <div className='border-3 border-black rounded-full group'>
                <NavLink to={'/login'}>
                  <img src={assets.profile} alt="" className='w-10 filter invert cursor-pointer' />
                </NavLink>
                <div className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-17 right-20 bg-neutral-300 border-3 border-black font-semibold cursor-pointer rounded-md overflow-hidden transition-all duration-500'>
                  <button onClick={logoutHandler} type='button' className='hover:bg-neutral-400 py-1 px-6 cursor-pointer'>LogOut</button>
                </div>
              </div>
            </div>
            :
            <div className='flex items-center gap-4 sm:gap-8 mt-2 text-lg font-semibold'>
              <NavLink to={'/buy'}>
                <button className='bg-gray-200 text-black rounded-full px-4 py-2 border-3 border-black w-30 cursor-pointer'>Pricing</button>
              </NavLink>
              <NavLink to={'/login'}>
                <button className='bg-gray-200 text-black rounded-full px-4 py-2 cursor-pointer border-3 border-black w-30'>Login</button>
              </NavLink>
            </div>
          }
        </div>
      </div>
      <hr className='h-[0.5]px w-[90%] border-1 mx-auto border-gray-200 ' />
      <Outlet />
    </div>
  )
}

export default Navbar
