import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';


const GeneratedImages = ({ setShowImageBox, activeView }) => {
  const { backendUrl, setImageData, bookmarkChange } = useContext(AppContext);
  const [imagesData, setImagesData] = useState();

  const getImagesData = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/image/get-all-images', {}, { withCredentials: true });
      if (response.data.success) {
        setImagesData(response.data.imagesData);
      }
      else {
        console.log("Unable to fetch images");
      }
    } catch (error) {
      console.log("Server error");
    }
  }

  useEffect(() => {
    getImagesData();
  }, [bookmarkChange]);

  return (
    <div className='p-[1vw]'>
      <div className='w-full md:h-[85vh] h-[660px] overflow-scroll custom-scroll border-3 border-neutral-800 grid md:grid-cols-4 grid-cols-1 md:gap-[1vw] gap-4 p-[1vw] auto-rows-min'>
        {imagesData && (
          (activeView === 'bookmarks'   //getting final images data based on bookmarks or not
            ? imagesData.filter(image => image.bookmark)
            : imagesData
          ).length === 0 ? ( //if lenght of that array (after filtering) is 0, then show message
            <div className='text-center text-neutral-500 text-lg whitespace-nowrap'>
              {activeView === 'bookmarks' ? 'No Bookmarked Images Yet' : 'No Generated Images Yet'}
            </div>
          ) :  //else display images 
            (
              (activeView === 'bookmarks' //filter or not for displaying images
                ? imagesData.filter(image => image.bookmark === true)
                : imagesData
              ).map((image, index) => (
                <div onClick={() => {
                  setShowImageBox(true);
                  setImageData(image);
                }} key={index} className='md:aspect-square md:border-2 md:border-neutral-700/30 overflow-hidden cursor-pointer'>
                  <img src={image.url} alt="" className='object-contain w-full h-full' />
                </div>
              ))
            ))
        }
      </div>
    </div>
  )
}

export default GeneratedImages
