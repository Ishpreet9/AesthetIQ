import React from 'react'
import { IoGridOutline, IoGrid } from "react-icons/io5";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";



const Sidebar = ({activeView, setActiveView}) => {
  return (
    <div className='md:h-[89vh] p-[1vw] md:mt-0 mt-20'>
        {/* main div inside which both buttons exist */}
      <div className='flex md:flex-col md:gap-[2vw] gap-4 bg-neutral-700 md:h-full w-full md:p-[1.5vw] px-4 py-2'>
        {/* all and bookmarks buttons */}
        <button onClick={()=>setActiveView('all')} className='relative group bg-neutral-900 flex items-center justify-center md:p-[1.4vw] p-3 rounded-lg cursor-pointer'>
          {
            activeView === 'all' ? 
            <IoGrid size={32} color='white' className='opacity-90'/>
            :
            <IoGridOutline size={32} color='white' className='opacity-90'/>
          }
            <span className='absolute left-[4.7vw] bottom-[9vh] bg-neutral-500 text-neutral-300 whitespace-nowrap px-2 rounded-sm py-[0.1vw] hidden group-hover:inline'>all images</span>
        </button>
        <button onClick={()=>setActiveView('bookmarks')} className='relative group bg-neutral-900 flex items-center justify-center md:p-[1.4vw] p-3 rounded-lg cursor-pointer'>
            {
            activeView === 'bookmarks' ?
            <FaBookmark size={32} color='white' className='opacity-90'/>
            :
            <FaRegBookmark size={32} color='white' className='opacity-90'/>
            }
            <span className='absolute left-[4.7vw] bottom-[9vh] bg-neutral-500 text-neutral-300 whitespace-nowrap px-2 rounded-sm py-[0.1vw] hidden group-hover:inline'>bookmarks</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
