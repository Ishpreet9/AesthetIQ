import React, { useContext, useState } from 'react'
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

  const { user, credits, setUser, setCredits, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='flex flex-col justify-center z-10 '>
      <div className='md:py-[1vh] py-3 flex justify-between items-center md:px-[6vw] px-4'>
        <div className='flex gap-[1vw] items-center text-[1.7vw] font-semibold italic'>
          <Link to='/'>
            <img src={assets.logo} alt="" className='md:w-[4.5vw] w-14 filter invert' />
          </Link>
          <p className='text-neutral-200 md:inline hidden'>{user?`Hello ${user}`:'AesthetiQ'}</p>
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
                <NavLink to={'/profile'} className='flex justify-center items-center text-center bg-neutral-200 text-neutral-900 md:text-[2.5vw] text-4xl md:pb-[0.2vw] pb-[1.5vw] font-bold md:w-[4vw] w-13 md:h-[4vw] h-13 rounded-full border-3 border-black'>
                  <span>{user.charAt(0)}</span>
                </NavLink>
              </div>
            :
            <div>
              <div className='relative md:invisible visible block md:hidden'>
                <div>
                  <img src={assets.menu} alt="" className='w-10 invert opacity-80' onClick={() => setShowMenu(!showMenu)} />
                </div>
                {
                showMenu &&
                <div className={`fixed w-screen h-screen z-20 inset-0 bg-white/10 backdrop-blur-sm flex flex-col justify-center items-center`}>
                    <img onClick={()=>setShowMenu(false)} src={assets.cross} alt="" className='absolute w-[9vw] right-8 top-8 invert opacity-50' />
                  <div className='relative flex flex-col text-[7.5vw] border-3 border-black font-semibold gap-6 bg-neutral-800 p-10 rounded-xl'>
                    <NavLink to={'/login'} onClick={()=>setShowMenu(false)} className="flex justify-center items-center border-3 border-neutral-500 px-5 py-4 bg-neutral-700 text-white rounded-lg">
                      LOGIN
                    </NavLink>
                    <NavLink to={'/buy'} onClick={()=>setShowMenu(false)} className="flex justify-center items-center border-3 border-neutral-500 px-5 py-4 bg-neutral-700 text-white rounded-lg">
                      PRICING
                    </NavLink>
                  </div>
                </div>
                }
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
