import React from 'react'
import { assets } from '../assets/assets'

const Sidebar = ({activeView, setActiveView}) => {
  return (
    <div className='h-[89vh] p-[1vw]'>
        {/* main div inside which both buttons exist */}
      <div className='flex flex-col gap-[2vw] bg-neutral-700 h-full p-[1.5vw]'>
        {/* all and bookmarks buttons */}
        <button onClick={()=>setActiveView('all')} className='relative group bg-neutral-900 flex items-center justify-center p-[1.4vw] rounded-lg cursor-pointer'>
            <img src={activeView === 'all' ? assets.grid_filled : assets.grid_empty} alt="" className={`invert w-[3.2vw] ${activeView === 'all' ? 'opacity-90' : 'opacity-70'}`} />
            <span className='absolute left-[4.7vw] bottom-[9vh] bg-neutral-500 text-neutral-300 whitespace-nowrap px-2 rounded-sm py-[0.1vw] hidden group-hover:inline'>all images</span>
        </button>
        <button onClick={()=>setActiveView('bookmarks')} className='relative group bg-neutral-900 flex items-center justify-center p-[1.4vw] rounded-lg cursor-pointer'>
            <img src={activeView === 'bookmarks' ? assets.bookmark_filled : assets.bookmark_empty} alt="" className={`invert w-[3.2vw] ${activeView === 'bookmarks' ? 'opacity-90' : 'opacity-70'}`} />
            <span className='absolute left-[4.7vw] bottom-[9vh] bg-neutral-500 text-neutral-300 whitespace-nowrap px-2 rounded-sm py-[0.1vw] hidden group-hover:inline'>bookmarks</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
