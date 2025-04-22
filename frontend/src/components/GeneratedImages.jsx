import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import axios from 'axios';


const GeneratedImages = ({setShowImageBox}) => {
    const { backendUrl, setImageData } = useContext(AppContext);
    const [imagesData,setImagesData] = useState();

    const getImagesData = async () => {
      try {
        const response = await axios.post(backendUrl+'/api/image/get-all-images',{},{ withCredentials: true});
        if(response.data.success)
        {
          setImagesData(response.data.imagesData);
        }
        else{
          console.log("Unable to fetch images");
        }
      } catch (error) {
        console.log("Server error");
      }
    }

    useEffect(() => {
      getImagesData();
    }, []);
    
    useEffect(() => {
      console.log(imagesData);
    }, [imagesData]);

    return (
        <div className='p-[1vw]'>
            <div className='w-full h-[85vh] overflow-scroll custom-scroll border-3 border-neutral-800 grid grid-cols-5 gap-[1vw] p-[1vw] auto-rows-min'>
                {imagesData && imagesData.map((image, index) =>(
                    <div onClick={()=>{
                      setShowImageBox(true);
                      setImageData(image);
                    }} key={index} className='aspect-square overflow-hidden'>
                        <img src={image.url} alt="" className='object-contain w-full h-full'/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GeneratedImages
