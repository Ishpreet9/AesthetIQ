import React from 'react'
import { assets } from '../assets/assets'

const Generate = () => {
  return (
    <div className='flex flex-col gap-6 text-center justify-center items-center mt-12'>
    {/* image section */}
      <div className='bg-neutral-700 w-60 h-60'>
        <img src={assets.sample_image_2} alt="" className='cursor-pointer' />
      </div>
      {/* download and share button */}
      <div className='flex gap-10'>
        <div className='bg-neutral-700 w-13 h-13 rounded-md cursor-pointer flex items-center justify-center'>
          <img src={assets.download} alt="" className='w-10 filter invert opacity-60'/>
        </div>
        <div className='bg-neutral-700 w-13 h-13 rounded-md cursor-pointer flex items-center justify-center'>
          <img src={assets.share} alt="" className='w-8 filter invert opacity-60' />
        </div>
      </div>
      <form action="" className='flex items-start gap-5 items-center'>
      {/* prompt box */} 
        <textarea name="" id="" className='bg-neutral-900 text-white w-150 h-40 border-3 border-black rounded-xl p-2 text-xl overflow-hidden opacity-75 focus:outline-none'></textarea>
      {/* generate button  */}
      <button type='submit' className='bg-neutral-900 text-neutral-200 px-10 py-4 w-fit rounded-xl border-3 border-black cursor-pointer hover:border-neutral-200 transition-all duration-500'>
        GENERATE 
      </button>
      </form>
    </div>
  )
}

export default Generate
