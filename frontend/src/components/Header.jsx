import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center md:my-[9vh] my-12'>
      <div className='text-neutral-400 inline-flex text-center gap-2 bg-neutral-700 px-6 py-1 rounded-full'>
        <p>""Generate Images from Text Instantly"</p>
      </div>
      <h1 style={{ WebkitTextStroke: "1px black" }} className='md:text-[4vw] text-4xl md:max-w-[50vw] max-w-[360px] mx-auto md:mt-10 mt-8 text-center font-bold text-neutral-300'>"Your Imagination, Rendered in Pixels by AI"</h1>
      <Link to={'/generate'}>
      <button className='md:mt-[4vw] mt-14 bg-neutral-200 md:px-[1.2vw] px-3 md:py-[1.2vh] py-1 font-bold md:text-[1.7vw] text-lg rounded-full inline-flex items-center gap-3 cursor-pointer border-3 border-black'>Generate Images
        <img src={assets.magic_wand} alt="" className='w-8' />
      </button>
      </Link>
      <div className='flex flex-wrap justify-center md:mt-[4vw] mt-16 gap-7'>
        {Array(4).fill('').map((item,index)=>(
          <img src={assets[`sample_image_${index+1}`]} alt="" key={index} className='hover:scale-110 transition-all duration-300 cursor-pointer md:w-[10vw] w-34 border-3 border-black rounded-xl'/>
        ))}
      </div>
    </div>
  )
}

export default Header
