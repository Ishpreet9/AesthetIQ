import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const imageBox = ({setShowImageBox, page}) => {
  
  const { imageData, setImageData } = useContext(AppContext);

    // needs updating for download
    const downloadImage = () => {
      if (imageData) {
        const link = document.createElement('a');
        link.href = imageData.url;
        link.download = 'generatedImage.webp'
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Saving Image...")
      }
      else {
        toast.error("Unable to download image!")
        console.log("Image not available to download");
      }
    }

  return (
    <div className='fixed z-20 bg-black text-white w-[95vw] h-[96vh] flex flex-col justify-between md:mb-14 mb-4'>
      {/* top section */}
      <div className='flex items-center justify-between bg-neutral-900 w-full h-[6vh] md:px-10 px-4'>
        <div className='flex gap-[0.5vw] bg-neutral-800 px-[1vw] items-center rounded-sm'>
          <button className='border-[0.1vw] border-neutral-500 p-[0.2vw] rounded-sm cursor-pointer'>
          <img src={assets.copy} alt="" className='w-[1.1vw] h-[2.3vh] invert opacity-70'/>
          </button>
          <p className='text-neutral-300 whitespace-nowrap overflow-scroll custom-scroll max-w-[50vw]'>{imageData.prompt}</p>
        </div>
        <button onClick={()=>{
          setShowImageBox(false);
          if(page === 'all-generations')
          {
            setImageData(null);
          }
          }}>
          <img src={assets.cross} alt="" className='invert md:w-[1.5vw] md:h-[1.5vw] w-5 h-5 opacity-70 cursor-pointer' />
        </button>
      </div>
      {/* image section */}
      <div className='overflow-hidden w-full h-full'>
        <img src={imageData.url} alt="" className='object-contain w-full h-full' />
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
