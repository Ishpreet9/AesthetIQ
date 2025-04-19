import React from 'react'
import { assets } from '../assets/assets'

const imageBox = ({image,setShowImageBox,downloadImage}) => {
  return (
    <div className='fixed z-20 bg-black text-white w-[95vw] h-[96vh] flex flex-col justify-between md:mb-13 mb-4'>
      {/* top section */}
      <div className='flex items-center justify-end bg-neutral-900 w-full h-[6vh] md:px-10 px-4'>
        <button onClick={()=>setShowImageBox(false)}>
          <img src={assets.cross} alt="" className='invert md:w-[1.5vw] md:h-[1.5vw] w-5 h-5 opacity-70 cursor-pointer' />
        </button>
      </div>
      {/* image section */}
      <div className='overflow-hidden w-full h-full'>
        <img src={image} alt="" className='object-contain w-full h-full' />
      </div>
      {/* bottom section */}
      <div className=' flex md:flex-col gap-5 items-center justify-end pr-5 z-30 absolute right-0 bottom-5'>
        <button onClick={()=>{downloadImage()}} className='bg-neutral-700 w-[7vh] h-[7vh] rounded-xl md:p-[0.5vw] p-2 cursor-pointer hover:border-2 border-neutral-300'>
          <img src={assets.download} alt="" className='invert opacity-40'/>
        </button>
        <button className='bg-neutral-700 w-[7vh] h-[7vh] rounded-xl md:p-[0.7vw] p-3 cursor-pointer hover:border-2 border-neutral-300'>
          <img src={assets.share} alt="" className='invert opacity-40'/>
        </button>
      </div>
    </div>
  )
}

export default imageBox
