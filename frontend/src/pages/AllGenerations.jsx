import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import GeneratedImages from '../components/GeneratedImages';
import ImageBox from '../components/ImageBox';


const AllGenerations = () => {
    const [activeView, setActiveView] = useState('all');
    const [showImageBox, setShowImageBox] = useState(false);
  return (
    <div className='flex flex-col items-center h-[88vh] justify-center'>
      {showImageBox ? <ImageBox setShowImageBox={setShowImageBox} page={'all-generations'}/> : <div className='hidden'></div>}
    <div className='md:grid md:grid-cols-[10vw_1fr] flex flex-col px-[5vw]'>
      <Sidebar activeView={activeView} setActiveView={setActiveView}/>
      <GeneratedImages setShowImageBox={setShowImageBox} activeView={activeView} />
    </div>
    </div>
  )
}

export default AllGenerations
