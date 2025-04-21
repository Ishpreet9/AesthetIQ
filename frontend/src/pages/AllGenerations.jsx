import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import GeneratedImages from '../components/GeneratedImages';

const AllGenerations = () => {
    const [activeView,setActiveView] = useState('all');
  return (
    <div className='grid grid-cols-[11vw_1fr] px-[5vw]'> 
      <Sidebar activeView={activeView} setActiveView={setActiveView}/>
      <GeneratedImages />
    </div>
  )
}

export default AllGenerations
