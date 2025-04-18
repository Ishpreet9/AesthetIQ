import React from 'react'
import { assets } from '../assets/assets'

const imageBox = ({image,setShowImageBox,downloadImage}) => {
  return (
    <div className='fixed z-20 bg-black text-white h-[41rem] w-[84rem] flex flex-col justify-between'>
      {/* top section */}
      <div className='flex items-center justify-end bg-neutral-900 w-full h-11 px-10'>
        <button onClick={()=>setShowImageBox(false)}>
          <img src={assets.cross} alt="" className='invert w-6 h-6 opacity-70 cursor-pointer' />
        </button>
      </div>
      {/* image section */}
      <div className='overflow-hidden w-full h-full'>
        <img src={image} alt="" className='object-contain w-full h-full' />
      </div>
      {/* bottom section */}
      <div className=' flex flex-col gap-5 items-center justify-end pr-5 z-30 absolute right-1 bottom-5'>
        <button onClick={()=>{downloadImage()}} className='bg-neutral-700 w-15 h-15 rounded-xl p-2 cursor-pointer hover:border-2 border-neutral-300'>
          <img src={assets.download} alt="" className='invert opacity-40'/>
        </button>
        <button className='bg-neutral-700 w-15 h-15 rounded-xl p-3 cursor-pointer hover:border-2 border-neutral-300'>
          <img src={assets.share} alt="" className='invert opacity-40'/>
        </button>
      </div>
    </div>
  )
}

export default imageBox
