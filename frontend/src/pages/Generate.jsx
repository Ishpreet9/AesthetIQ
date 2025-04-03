import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import Loader from '../components/Loader';

const Generate = () => {

  const { backendUrl, image, setImage } = useContext(AppContext);
  const [prompt,setPrompt] = useState('');
  const [style,setStyle] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(backendUrl + '/api/image/generate-image',{ prompt, style },{ withCredentials: true });

      if(response.data.success)
      {
        setImage(response.data.resultImage);
        console.log(response.data.message);
      }
      else
      {
        console.log("Image not generated!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex flex-col gap-6 text-center justify-center items-center mt-12'>
    {/* image section */}
      <div className='bg-neutral-700 w-60 h-60'>
        {isLoading ?
        <div className='flex justify-center items-center h-full'>
          <Loader/>
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
          <img src={assets.download} alt="" className='w-10 filter invert opacity-60'/>
        </div>
        <div className='bg-neutral-700 w-13 h-13 rounded-md cursor-pointer flex items-center justify-center'>
          <img src={assets.share} alt="" className='w-8 filter invert opacity-60' />
        </div>
      </div>
      <form onSubmit={onSubmitHandler} action="" className='flex items-start gap-5 items-center min-h-[160px]'>
      {/* prompt box */} 
        <textarea onChange={(e)=>setPrompt(e.target.value)} value={prompt} name="" id="" className='bg-neutral-900 text-white w-150 h-40 border-3 border-black rounded-xl p-2 text-xl overflow-hidden opacity-75 focus:outline-none'></textarea>
      {/* generate button  */}
      <div className='flex flex-col h-[160px] justify-around relative'>
      <button type='submit' className='bg-neutral-900 text-neutral-200 px-10 py-4 rounded-xl border-3 border-black cursor-pointer hover:border-neutral-200 transition-all duration-500 font-semibold'>
        GENERATE 
      </button>
      <div className='group'>
      <button type='button' className='relative z-0 bg-neutral-900 text-neutral-200 px-10 py-4 rounded-xl border-3 border-black cursor-pointer hover:border-neutral-200 transition-all duration-500 font-semibold min-w-44'>
        { style && <img src={style === 'anime' ? assets.anime_image : style === 'ghibli' ? assets.ghibli_image : style === 'realistic' ? assets.realistic_image : style === 'logo' ? assets.logo_image : ''} alt="" className='absolute h-full w-full object-cover rounded-xl bottom-0 left-0 opacity-70 z-0'/>}
        <div className='relative z-10'>
        <span>{style === 'anime' ? 'Anime' : style === 'ghibli' ? 'Ghibli-Style' : style === 'realistic' ? 'Realistic' : style === 'logo' ? 'Logo' : 'Style (None)'}</span> 
        </div>
      </button>
      <div className='bg-neutral-900/60 w-96 h-48 absolute bottom-20 left-10 grid grid-cols-2 grid-rows-2 gap-4 p-4 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500'>
        <button type='button' onClick={()=>setStyle('anime')} className='bg-neutral-900 rounded-xl border-3 border-black cursor-pointer relative hover:border-neutral-400 text-neutral-100 flex justify-center items-center text-center text-xl font-semibold'>
          <img src={assets.anime_image} alt="" className='absolute w-full h-full object-cover rounded-xl opacity-70'/>
          <span className='z-10'>Anime</span>
        </button>
        <button type='button' onClick={()=>setStyle('ghibli')} className='bg-neutral-900 rounded-xl border-3 border-black cursor-pointer relative hover:border-neutral-400 text-neutral-200 flex justify-center items-center text-center text-xl font-semibold'>
          <img src={assets.ghibli_image} alt="" className='absolute w-full h-full object-cover rounded-xl opacity-70'/>
          <span className='z-10'>Ghibli-Style</span>
        </button>
        <button type='button' onClick={()=>setStyle('realistic')} className='bg-neutral-900 rounded-xl border-3 border-black cursor-pointer relative hover:border-neutral-400 text-neutral-200 flex justify-center items-center text-center text-xl font-semibold'>
          <img src={assets.realistic_image} alt="" className='absolute w-full h-full object-cover rounded-xl opacity-70' />
          <span className='z-10'>Realistic</span>
        </button>
        <button type='button' onClick={()=>setStyle('logo')} className='bg-neutral-900 rounded-xl border-3 border-black cursor-pointer relative hover:border-neutral-400 text-neutral-200 flex justify-center items-center text-center text-xl font-semibold'>
          <img src={assets.logo_image} alt="" className='absolute w-full h-full object-cover rounded-xl opacity-70'/>
          <span className='z-10'>Logo</span>
        </button>
      </div>
      </div>
      </div>
      </form>
    </div>
  )
}

export default Generate
