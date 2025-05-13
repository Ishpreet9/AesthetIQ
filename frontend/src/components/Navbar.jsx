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
      <div className='md:py-[1vh] py-3 flex justify-between items-center md:px-[6vw] px-4'>
        <div className='flex gap-[1vw] items-center text-[1.7vw] font-semibold italic'>
          <Link to='/'>
            <img src={assets.logo} alt="" className='md:w-[4.5vw] w-14 filter invert' />
          </Link>
          <p className='text-neutral-200 md:inline hidden'>{`Hello ${user}`}</p>
        </div>
        <div>
          {user ?
              <div className='flex gap-4 mt-3 items-center'>
                <NavLink to={'/buy'}>
                  <button className='flex gap-[0.3vw] md:text-[1.3vw] items-center bg-neutral-200 md:px-[0.7vw] md:py-[0.5vw] p-2 rounded-md border-3 border-black font-semibold cursor-pointer'>
                    <p>{`Credits : ${credits}`}</p>
                    <img src={assets.flame} alt="" className='md:w-[2vw] w-6' />
                  </button>
                </NavLink>
                <div className='md:block hidden border-3 border-black rounded-full group'>
                  <NavLink to={'/profile'}>
                    <img src={assets.profile} alt="" className='w-[3vw] filter invert cursor-pointer' />
                  </NavLink>
                </div>
                <button onClick={logoutHandler} className='md:hidden flex items-center bg-neutral-200 py-1 px-2 rounded-md border-3 border-black font-bold cursor-pointer'>
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
              <div className='flex items-center gap-4 md:gap-8 mt-2 text-[1.4vw] font-semibold md:visible invisible md:flex hidden'>
                <NavLink to={'/buy'}>
                  <button className='bg-gray-200 text-black rounded-md py-[1vh] border-3 border-black w-[8vw] cursor-pointer hover:border-neutral-400/90 hover:text-neutral-200 hover:bg-neutral-900 transition-all duration-400'>Pricing</button>
                </NavLink>
                <NavLink to={'/login'}>
                  <button className='bg-gray-200 text-black rounded-md py-[1vh] cursor-pointer border-3 border-black w-[8vw] hover:border-neutral-400/90 hover:text-neutral-200 hover:bg-neutral-900 transition-all duration-400'>Login</button>
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
