import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { RiResetLeftFill } from "react-icons/ri";
import { MdConstruction } from "react-icons/md";
import { toast } from 'react-toastify';

const BuyCredits = () => {

  const { backendUrl,getCredits,credits} = useContext(AppContext);
  const [creditAmount, setCreditAmount] = useState(25);
  
  const resetCreditsHandler = async () => {
    try {
      if(credits === 5)
      {
        toast.error('User credits already at default value')
      }
      const response = await axios.post(backendUrl+'/api/user/reset-credits',{},{withCredentials:true});
      if(response.data.success)
      {
        toast.success('User credits reset to default');
        getCredits();
      }
      else{
        toast.error('Unable to reset credits');
        console.log(error);
      }
      

    } catch (error) {
      toast.error('Unable to reset credits');
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center gap-[0.7vw]'>
      <div className='flex items-center md:gap-[1vw] gap-2 mt-[2vw] md:p-0 p-7'>
        <div className='md:w-[2.5vw] w-20'>
        <MdConstruction color='white' className='opacity-50 w-full h-full'/>
        </div>
        <p className='text-neutral-400 md:text-[1.3vw]'>Payment system under development ! Need more credits ? Reset credits for now & enjoy unlimited generations...</p>
      </div>
      <button onClick={()=>resetCreditsHandler()} className='flex justify-center items-center md:gap-[0.5vw] gap-2 bg-blue-400 md:w-[12vw] md:h-[3vw] rounded-md text-white md:p-0 p-2 cursor-pointer hover:bg-blue-500'>
        <p className='md:text-[1.2vw] text-lg font-semibold'>RESET CREDITS</p>
        <RiResetLeftFill size={20}/>
      </button>
      </div>
      <div className='flex justify-center text-neutral-200 md:mt-[5vw] mt-10 md:text-[3vw] text-3xl font-bold'>
        <p>BUY CREDITS</p>
      </div>
      <p className='text-neutral-200'>(1 CREDIT: ₹10)</p>
      <form className='flex flex-col items-center md:gap-[3.9vw] gap-5 text-neutral-200 mt-[2vw]'>
        <div className='flex flex-col gap-[1vw]'>
          <p className='md:text-[1.6vw] text-lg'>Credit Amount: </p>
          <div className='flex md:gap-[1vw] gap-2 items-center'>
          <input type="number" value={creditAmount} onChange={(e)=>setCreditAmount(e.target.value)} className='bg-neutral-700 no-spinners text-neutral-200 md:text-[2vw] text-lg md:px-[1vw] px-2 md:w-[25vw] w-55 md:h-[4vw] h-10 border-2 border-neutral-600' />
          <button onClick={()=>setCreditAmount(prev=>prev-1)} type='button' className='flex justify-center items-center bg-red-400 md:w-[4vw] md:h-[4vw] w-10 h-10 md:text-[3vw] text-5xl text-white md:pb-[0.4vw] pb-3 cursor-pointer'>
            -
          </button>
          <button onClick={()=>setCreditAmount(prev=>prev+1)} type='button' className='flex justify-center items-center bg-green-400 md:w-[4vw] md:h-[4vw] w-10 h-10 md:text-[3vw] text-5xl text-white md:pb-[0.4vw] pb-3 cursor-pointer'>
            +
          </button>
        </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
        <p className='text-neutral-200 md:text-[1.3vw] text-2xl'>Price: ₹{10*creditAmount}</p>
        <button type='button' className='bg-blue-400 rounded-md md:w-[11vw] md:h-[4vw] md:text-[1.6vw] text-2xl md:px-0 px-3 md:py-0 py-2 md:mt-0 mt-5 text-white cursor-pointer hover:bg-blue-500'>
          <p>Buy Now</p>
        </button>
        </div>
      </form>
    </div>
  )
}

export default BuyCredits

