import React, { useContext, useState } from 'react'
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Navbar = () => {



  const { user, credits, setUser, setCredits, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

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
      <div className='md:py-2 py-3 flex justify-between items-center md:px-28 px-4'>
        <div className='flex gap-6 items-center text-xl font-semibold italic'>
          <Link to='/'>
            <img src={assets.logo} alt="" className='md:w-16 w-14 filter invert' />
          </Link>
          <p className='text-neutral-200 md:inline hidden'>{`Hello ${user}`}</p>
        </div>
        <div>
          {user ?
              <div className='flex gap-4 mt-3 items-center'>
                <NavLink to={'/buy'}>
                  <button className='flex gap-2 items-center bg-neutral-200 p-2 rounded-full border-3 border-black font-semibold cursor-pointer'>
                    <p>{`Credits left: ${credits}`}</p>
                    <img src={assets.coin} alt="" className='w-6' />
                  </button>
                </NavLink>
                <div className='md:block hidden border-3 border-black rounded-full group'>
                  <NavLink to={'/login'}>
                    <img src={assets.profile} alt="" className='w-10 filter invert cursor-pointer' />
                  </NavLink>
                  <div className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-17 right-20 bg-neutral-300 border-3 border-black font-semibold cursor-pointer rounded-md overflow-hidden transition-all duration-500'>
                    <button onClick={logoutHandler} type='button' className='hover:bg-neutral-400 py-1 px-6 cursor-pointer'>LogOut</button>
                  </div>
                </div>
                <button onClick={logoutHandler} className='md:hidden flex items-center bg-neutral-200 py-1 px-2 rounded-full border-3 border-black font-bold cursor-pointer'>
                    <img src={assets.logout} alt="" className='w-8' />
                  </button>
              </div>
            :
            <div>
              <div className='relative md:invisible visible block md:hidden'>
                <div>
                  <img src={assets.menu} alt="" className='w-10 invert opacity-80' onClick={() => setShowMenu(!showMenu)} />
                </div>
                <div className={`absolute w-32 h-30 bg-neutral-900 opacity-70 right-2 flex flex-col justify-around p-2 gap-2 ${showMenu ? 'visible block' : 'invisible hidden'}`}>
                  <div className='text-neutral-100 active:bg-neutral-800 text-2xl flex justify-center items-center bg-black w-full h-full'>
                    <NavLink to={'/buy'} onClick={() => setShowMenu(false)}>
                      <button type='button'>PRICING</button>
                    </NavLink>
                  </div>
                  <div className='text-neutral-200 active:bg-neutral-800 text-2xl flex justify-center items-center bg-black w-full h-full'>
                    <NavLink to={'/login'} onClick={() => { setShowMenu(false) }}>
                      <button type='button'>LOGIN</button>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-4 md:gap-8 mt-2 text-lg font-semibold md:visible invisible md:flex hidden'>
                <NavLink to={'/buy'}>
                  <button className='bg-gray-200 text-black rounded-full px-4 py-2 border-3 border-black w-30 cursor-pointer'>Pricing</button>
                </NavLink>
                <NavLink to={'/login'}>
                  <button className='bg-gray-200 text-black rounded-full px-4 py-2 cursor-pointer border-3 border-black w-30'>Login</button>
                </NavLink>
              </div>
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
