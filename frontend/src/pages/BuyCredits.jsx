import React, { useState } from 'react'
import { assets } from '../assets/assets'

const BuyCredits = () => {

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='bg-neutral-600 text-neutral-200 text-lg inline-flex px-8 py-3 mt-10 rounded-full cursor-pointer'>
        <p>"PURCHASE CREDITS"</p>
      </div>
      <div className='mt-16 flex md:flex-row flex-col gap-10 mb:mb-0 mb-10'>
        <div className='bg-neutral-600 flex flex-col gap-4 p-6 rounded-xl text-center w-80'>
          <img src={assets.wrench} alt="" className='w-12 filter invert mx-auto' />
          <h1 className='text-4xl font-bold text-neutral-200'>BASIC</h1>
          <p className='text-neutral-300 text-xl'>₹199 for 100 credits</p>
          <ul className='text-neutral-400 text-lg space-y-2 text-left'>
            <li>✔ Access to standard AI models</li>
            <li>✔ Up to 1024x1024 resolution</li>
            <li>✔ No priority processing</li>
          </ul>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 cursor-pointer'>
            Buy Now
          </button>
        </div>

        <div className='bg-neutral-600 flex flex-col gap-4 p-6 rounded-xl text-center w-80'>
          <img src={assets.rocket} alt="" className='w-13 filter invert mx-auto' />
          <h1 className='text-4xl font-bold text-neutral-200'>STANDARD</h1>
          <p className='text-neutral-300 text-xl'>₹499 for 300 credits</p>
          <ul className='text-neutral-400 text-lg space-y-2 text-left'>
            <li>✔ Access to advanced AI models</li>
            <li>✔ Up to 1792x1024 resolution</li>
            <li>✔ Faster processing time</li>
          </ul>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 cursor-pointer'>
            Buy Now
          </button>
        </div>
        
        <div className='bg-neutral-600 flex flex-col gap-4 p-6 rounded-xl text-center w-80'>
          <img src={assets.crown} alt="" className='w-14 filter invert mx-auto' />
          <h1 className='text-4xl font-bold text-neutral-200'>PREMIUM</h1>
          <p className='text-neutral-300 text-xl'>₹999 for 700 credits</p>
          <ul className='text-neutral-400 text-lg space-y-2 text-left'>
            <li>✔ Access to all AI models</li>
            <li>✔ Up to 2048x2048 resolution</li>
            <li>✔ Highest priority for processing</li>
          </ul>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 cursor-pointer'>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuyCredits
