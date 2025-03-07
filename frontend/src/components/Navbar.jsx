import React, { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = () => {

    const [user,setUser] = useState(true);
    const navigate = useNavigate();

    return (
        <div className='flex flex-col justify-center '>
        <div className='py-2 flex justify-between px-28'>
            <Link to='/'>
                <img src={assets.logo} alt="" className='w-16 filter invert' />
            </Link>
            <Outlet />
            <div>
                {user ? 
                  <div className='flex gap-4 mt-3 items-center'>
                    <button className='flex gap-2 items-center bg-neutral-200 p-2 rounded-full border-3 border-black font-semibold cursor-pointer'>
                      <p>Credits left: 10</p>
                      <img src={assets.star} alt="" className='w-5' />
                    </button>
                    <div className='border-3 border-black rounded-full group'>
                      <img src={assets.profile} alt="" className='w-10 filter invert cursor-pointer' />
                      <div className='absolute hidden group-hover:block top-14 right-14 bg-neutral-300 border-3 border-black font-semibold p-1 cursor-pointer'>
                        <ul>
                          <li>LogOut</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                    :
                  <div className='flex items-center gap-4 sm:gap-8 mt-2 text-lg font-semibold'>
                    <button className='bg-gray-200 text-black rounded-full px-4 py-2 border-3 border-black w-30'>Pricing</button>  
                    <button className='bg-gray-200 text-black rounded-full px-4 py-2 cursor-pointer border-3 border-black w-30'>Login</button>
                  </div>
                }
            </div>
        </div>
        <hr className='h-[0.5]px w-[90%] border-1 mx-auto border-gray-200 ' />
      </div>
    )
}

export default Navbar
