import React from 'react'
import { assets } from '../assets/assets'

const Sidebar = ({activeView, setActiveView}) => {
  return (
    <div className='md:h-[89vh] p-[1vw] md:mt-0 mt-3'>
        {/* main div inside which both buttons exist */}
      <div className='flex md:flex-col md:gap-[2vw] gap-4 bg-neutral-700 md:h-full w-full md:p-[1.5vw] px-4 py-2'>
        {/* all and bookmarks buttons */}
        <button onClick={()=>setActiveView('all')} className='relative group bg-neutral-900 flex items-center justify-center md:p-[1.4vw] p-3 rounded-lg cursor-pointer'>
            <img src={activeView === 'all' ? assets.grid_filled : assets.grid_empty} alt="" className={`invert md:w-[3.2vw] w-7 ${activeView === 'all' ? 'opacity-90' : 'opacity-70'}`} />
            <span className='absolute left-[4.7vw] bottom-[9vh] bg-neutral-500 text-neutral-300 whitespace-nowrap px-2 rounded-sm py-[0.1vw] hidden group-hover:inline'>all images</span>
        </button>
        <button onClick={()=>setActiveView('bookmarks')} className='relative group bg-neutral-900 flex items-center justify-center md:p-[1.4vw] p-3 rounded-lg cursor-pointer'>
            <img src={activeView === 'bookmarks' ? assets.bookmark_filled : assets.bookmark_empty} alt="" className={`invert md:w-[3.2vw] w-7 ${activeView === 'bookmarks' ? 'opacity-90' : 'opacity-70'}`} />
            <span className='absolute left-[4.7vw] bottom-[9vh] bg-neutral-500 text-neutral-300 whitespace-nowrap px-2 rounded-sm py-[0.1vw] hidden group-hover:inline'>bookmarks</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
