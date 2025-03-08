import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center my-18'>
      <div className='text-neutral-400 inline-flex text-center gap-2 bg-neutral-700 px-6 py-1 rounded-full'>
        <p>""Generate Images from Text Instantly"</p>
      </div>
      <h1 style={{ WebkitTextStroke: "1px black" }} className='text-6xl max-w-[750px] mx-auto mt-10 text-center font-bold text-neutral-300'>"Your Imagination, Rendered in Pixels by AI"</h1>
      <button className='mt-14 bg-neutral-200 px-6 py-2 font-bold text-2xl rounded-full inline-flex items-center gap-3 cursor-pointer border-3 border-black'>Generate Images
        <img src={assets.magic_wand} alt="" className='w-8' />
      </button>
      <div className='flex flex-wrap justify-center mt-16 gap-7'>
        {Array(4).fill('').map((item,index)=>(
          <img src={assets[`sample_image_${index+1}`]} alt="" key={index} className='hover:scale-110 transition-all duration-300 cursor-pointer w-34 border-3 border-black rounded-xl'/>
        ))}
      </div>
    </div>
  )
}

export default Header
