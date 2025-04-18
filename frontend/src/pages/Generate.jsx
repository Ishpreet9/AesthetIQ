import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import Loader from '../components/Loader';

const Generate = () => {

  const { backendUrl, image, setImage, getCredits } = useContext(AppContext);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showStyles, setShowStyles] = useState(false);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageRatio, setImageRatio] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(backendUrl + '/api/image/generate-image', { prompt, style, aspectRatio }, { withCredentials: true });

      if (response.data.success) {
        getCredits();
        setImageRatio(aspectRatio);
        setImage(response.data.resultImage);
        console.log(response.data.message);
      }
      else {
        console.log("Image not generated!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const downloadImage = () => {
    if (image !== '') {
      const link = document.createElement('a');
      link.href = image;
      link.download = 'generatedImage.webp'
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    else {
      console.log("Image not available to download");
    }
  }

  useEffect(()=>{
    setImageRatio('1:1');
  },[]);

  return (
    <div className='flex flex-col gap-6 text-center justify-center items-center mt-12'>
      {/* image section */}
      <div className={`bg-neutral-700 ${imageRatio === '1:1' ? 'w-60 h-60' : imageRatio === '16:9' ? 'md:w-108 md:h-60 w-90 h-51' : 'w-45 h-65'}`}>
        {isLoading ?
          <div className='flex justify-center items-center h-full'>
            <Loader />
          </div>
          : image === '' ?
            <p></p>
            :
            <img src={image} alt="" className='cursor-pointer' />
        }
      </div>
      {/* download and share button */}
      <div className='flex gap-10'>
        <div className='bg-neutral-700 w-13 h-13 rounded-md cursor-pointer flex items-center justify-center'>
          <img src={assets.download} onClick={downloadImage} alt="" className='w-10 filter invert opacity-60' />
        </div>
        <div className='bg-neutral-700 w-13 h-13 rounded-md cursor-pointer flex items-center justify-center'>
          <img src={assets.share} alt="" className='w-8 filter invert opacity-60' />
        </div>
      </div>
      <form onSubmit={onSubmitHandler} action="" className='flex md:flex-row flex-col items-start gap-5 items-center min-h-[160px]'>
        {/* prompt box */}
        <textarea onChange={(e) => setPrompt(e.target.value)} value={prompt} placeholder='Enter prompt...' name="" id="" className='bg-neutral-900 text-white md:w-150 w-90 h-40 border-3 border-black rounded-xl p-2 text-xl overflow-hidden opacity-75 focus:outline-none'></textarea>
        {/* generate and style button  */}
        <div className='flex md:flex-col flex-row gap-4 md:gap-0 md:h-[160px] h-[60px] justify-around relative'>
          <button type='submit' className='bg-neutral-900 text-neutral-200 px-10 py-4 rounded-xl border-3 border-black cursor-pointer hover:border-neutral-200 transition-all duration-500 font-semibold'>
            GENERATE
          </button>
          <div className='group'>
            <button type='button' onClick={() => setShowStyles(!showStyles)} className='relative z-0 bg-neutral-900 text-neutral-200 px-10 py-4 rounded-xl border-3 border-black cursor-pointer hover:border-neutral-200 transition-all duration-500 font-semibold min-w-44'>
              {style && <img src={style === 'anime' ? assets.anime_image : style === 'ghibli' ? assets.ghibli_image : style === 'realistic' ? assets.realistic_image : style === 'logo' ? assets.logo_image : ''} alt="" className='absolute h-full w-full object-cover rounded-xl bottom-0 left-0 opacity-70 z-0' />}
              <div className='relative z-10'>
                <span>{style === 'anime' ? 'Anime' : style === 'ghibli' ? 'Ghibli-Style' : style === 'realistic' ? 'Realistic' : style === 'logo' ? 'Logo' : 'Style (None)'}</span>
              </div>
            </button>
            <div className={`bg-neutral-900/60 md:w-96 md:h-48 w-80 h-44 absolute md:bottom-18 md:left-10 left-14 bottom-15 grid grid-cols-2 grid-rows-2 gap-4 p-4 rounded-xl ${showStyles ? 'grid' : 'hidden'} md:hidden md:group-hover:grid`}>
              <button type='button' onClick={() => {setStyle('anime'); setShowStyles(false);}} className='bg-neutral-900 rounded-xl border-3 border-black cursor-pointer relative hover:border-neutral-400 text-neutral-100 flex justify-center items-center text-center text-xl font-semibold'>
                <img src={assets.anime_image} alt="" className='absolute w-full h-full object-cover rounded-xl opacity-70' />
                <span className='z-10'>Anime</span>
              </button>
              <button type='button' onClick={() => {setStyle('ghibli'); setShowStyles(false);}} className='bg-neutral-900 rounded-xl border-3 border-black cursor-pointer relative hover:border-neutral-400 text-neutral-200 flex justify-center items-center text-center text-xl font-semibold'>
                <img src={assets.ghibli_image} alt="" className='absolute w-full h-full object-cover rounded-xl opacity-70' />
                <span className='z-10'>Ghibli-Style</span>
              </button>
              <button type='button' onClick={() => {setStyle('realistic'); setShowStyles(false);}} className='bg-neutral-900 rounded-xl border-3 border-black cursor-pointer relative hover:border-neutral-400 text-neutral-200 flex justify-center items-center text-center text-xl font-semibold'>
                <img src={assets.realistic_image} alt="" className='absolute w-full h-full object-cover rounded-xl opacity-70' />
                <span className='z-10'>Realistic</span>
              </button>
              <button type='button' onClick={() => {setStyle('logo'); setShowStyles(false);}} className='bg-neutral-900 rounded-xl border-3 border-black cursor-pointer relative hover:border-neutral-400 text-neutral-200 flex justify-center items-center text-center text-xl font-semibold'>
                <img src={assets.logo_image} alt="" className='absolute w-full h-full object-cover rounded-xl opacity-70' />
                <span className='z-10'>Logo</span>
              </button>
            </div>
          </div>
        </div>
        <div className='flex md:flex-col flex-row md:justify-around justify-between md:w-0 w-full md:h-[160px] h-[60px]'>
          <button type='button' onClick={()=>setAspectRatio('16:9')} className={`flex items-center justify-center gap-4 bg-neutral-900 text-neutral-200 md:w-30 w-26 md:h-10 h-12 cursor-pointer rounded-lg border-3 ${aspectRatio === '16:9' ? 'border-red-400/90' : 'border-black'}`}>
            <div className='w-7 h-3.5 border-2 border-white'></div>
            <span>16:9</span>
          </button>
          <button type='button' onClick={()=>setAspectRatio('1:1')} className={`flex items-center justify-center gap-4 bg-neutral-900 text-neutral-200 md:w-30 w-26 md:h-10 h-12 cursor-pointer rounded-lg border-3 ${aspectRatio === '1:1' ? 'border-red-400/90' : 'border-black'}`}>
            <div className='w-5 h-5 border-2 border-white'></div>
            <span>1:1</span>
          </button>
          <button type='button' onClick={()=>setAspectRatio('2:3')} className={`flex items-center justify-center gap-4 bg-neutral-900 text-neutral-200 md:w-30 w-26 md:h-10 h-12 cursor-pointer rounded-lg border-3 ${aspectRatio === '2:3' ? 'border-red-400/90' : 'border-black'}`}>
            <div className='w-3.5 h-6 border-2 border-white'></div>
            <span>2:3</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Generate
