import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify';
import axios from 'axios';


const imageBox = ({setShowImageBox, page}) => {
  
  const { imageData, setImageData, backendUrl, setBookmarkChange, bookmarkChange } = useContext(AppContext);
  const [isBookmarked, setIsBookmarked] = useState(imageData.bookmark);

    const addBookmark = async () => {
      if(imageData?.url)
      {
        try {
          const response = await axios.post(backendUrl+'/api/image/add-bookmark',{imageUrl:imageData.url},{withCredentials: true});
          if(response.data.success)
          {
            setIsBookmarked(true);
            toast.success('Image Bookmarked');
            console.log('Image bookmarked')
          }
          else
          {
            toast.error('Image not bookmarked');
            console.log('Image not bookmarked');
          }
        } catch (error) {
          toast.error('An error occured while bookmarking');
          console.log(error); 
        }
      }
      else{
        console.log('Image url not available');
      }
    }

    const removeBookmark = async () => {
      if(imageData?.url)
      {
        try {
          const response = await axios.post(backendUrl+'/api/image/remove-bookmark',{imageUrl:imageData.url},{withCredentials: true});
          if(response.data.success)
          {
            setIsBookmarked(false);
            toast.success('Bookmark Removed');
            console.log('Bookmark Removed')
          }
          else
          {
            toast.error('Bookmark not removed');
            console.log('Bookmark not removed');
          }
        } catch (error) {
          toast.error('An error occured while removing bookmark');
          console.log(error); 
        }
      }
      else{
        console.log('Image url not available');
      }
    }

    const toggleBookmark = async () => {
      if(isBookmarked)
        {
          await removeBookmark();
        }
        else
        {
          await addBookmark();
        }
      if(page==='all-generations')
      {
        setBookmarkChange(!bookmarkChange);
      }
    }
    
    const downloadImage = async () => {
      if (imageData?.url) {
        try {
          const response = await fetch(imageData.url,{mode: 'cors'});

          if(!response.ok) throw new Error;
  
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
  
          const link = document.createElement('a');
          link.href = url; 
          link.download = 'generatedImage.png'
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          toast.success("Saving Image...");
        } catch (error) {
          console.error("Download failed", error);
          toast.error("Unable to download image!");
        }
      }
      else {
        console.log("Image not available to download");
      }
    }

    const copyPrompt = async() => {
      navigator.clipboard.writeText(imageData.prompt).then(
        ()=>{
          console.log('Prompt copied to clipboard');
        }
      ).catch((error)=>{
        console.error('Error copying text! ',error);
      });
    }

  return (
    <div className='fixed h-screen w-screen z-30 inset-0 bg-white/10 backdrop-blur-sm'>
    <div className='h-screen w-screen inset-0 text-white flex flex-col justify-between scale-96 bg-black'>
      {/* top section */}
      <div className='flex items-center justify-between bg-neutral-900 w-full h-[6vh] md:px-[1vw] px-[2.2vw]'>
      {/* image details */}
      <div className='flex md:gap-[1vw] gap-2'>

        <div className='flex gap-[0.5vw] bg-neutral-800 px-[0.7vw] items-center rounded-sm'>
          <button className='md:border-[0.1vw] border-neutral-500 p-[0.2vw] rounded-sm cursor-pointer'>
          <img onClick={()=>copyPrompt()} src={assets.copy} alt="" className='md:w-[1.1vw] h-[2.3vh] invert opacity-70'/>
          </button>
          <p className='text-neutral-300 whitespace-nowrap overflow-scroll custom-scroll max-w-[50vw]'>{imageData.prompt}</p>
        </div>
        <div className='bg-neutral-800 px-[0.7vw] rounded-sm text-neutral-300'>
          <p>{imageData.style === 'anime' ? 'Anime' : imageData.style === 'ghibli' ? 'Ghibli' : imageData.style === 'realistic' ? 'Realistic' : imageData.style === 'logo' ? 'Logo' : 'None'}</p>
        </div>
        <div className='bg-neutral-800 px-[0.7vw] rounded-sm text-neutral-300'>
          <p>{imageData.ratio === '1:1' ? '1:1' : imageData.ratio === '16:9' ? '16:9' : imageData.ratio === '2:3' ? '2:3' : 'err'}</p>
        </div>
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
        <button onClick={()=>{downloadImage()}} className='bg-neutral-700 w-[7vh] h-[7vh] rounded-xl md:p-[0.4vw] p-2 cursor-pointer hover:border-2 border-neutral-300'>
          <img src={assets.download} alt="" className='invert opacity-40'/>
        </button>
        <button onClick={()=>toggleBookmark()} className='bg-neutral-700 w-[7vh] h-[7vh] rounded-xl md:p-[0.8vw] p-3 cursor-pointer hover:border-2 border-neutral-300'>
          <img src={isBookmarked ? assets.bookmark_filled : assets.bookmark_empty} alt="" className='invert opacity-40'/>
        </button>
      </div>
    </div>
    </div>
  )
}

export default imageBox
