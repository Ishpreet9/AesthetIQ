import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
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
      <div className='flex items-center gap-[1vw] mt-[2vw]'>
        <img src={assets.construction} alt="" className='w-[3.4vw] invert opacity-40' />
        <p className='text-neutral-400 text-[1.3vw]'>Payment system under development ! Need more credits ? Reset credits for now...</p>
      </div>
      <button onClick={()=>resetCreditsHandler()} className='flex justify-center items-center gap-[0.5vw] bg-blue-400 w-[12vw] h-[3vw] rounded-md text-white cursor-pointer hover:bg-blue-500'>
        <p className='text-[1.2vw] font-semibold'>RESET CREDITS</p>
        <img src={assets.reset} alt="" className='w-[2vw] h-[2vw] invert' />
      </button>
      </div>
      <div className='flex justify-center text-neutral-200 mt-[5vw] text-[3vw] font-bold'>
        <p>BUY CREDITS</p>
      </div>
      <p className='text-neutral-200'>(1 CREDIT: ₹10)</p>
      <form className='flex flex-col items-center gap-[3.9vw] text-neutral-200 mt-[2vw]'>
        <div className='flex flex-col gap-[1vw]'>
          <p className='text-[1.6vw]'>Credit Amount: </p>
          <div className='flex gap-[1vw] items-center'>
          <input type="number" value={creditAmount} onChange={(e)=>setCreditAmount(e.target.value)} className='bg-neutral-700 no-spinners text-neutral-200 text-[2vw] px-[1vw] w-[25vw] h-[4vw] border-2 border-neutral-600' />
          <button onClick={()=>setCreditAmount(prev=>prev-1)} type='button' className='flex justify-center items-center bg-red-400 w-[4vw] h-[4vw] text-[3vw] text-white pb-[0.4vw] cursor-pointer'>
            -
          </button>
          <button onClick={()=>setCreditAmount(prev=>prev+1)} type='button' className='flex justify-center items-center bg-green-400 w-[4vw] h-[4vw] text-[3vw] text-white pb-[0.4vw] cursor-pointer'>
            +
          </button>
        </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
        <p className='text-neutral-200 text-[1.3vw]'>Price: ₹{10*creditAmount}</p>
        <button type='button' className='bg-blue-400 rounded-md w-[11vw] h-[4vw] text-[1.6vw] text-white cursor-pointer hover:bg-blue-500'>
          <p>Buy Now</p>
        </button>
        </div>
      </form>
    </div>
  )
}

export default BuyCredits




{/* <div className='flex flex-col justify-center items-center'>
<div className='bg-neutral-600 text-neutral-200 text-lg inline-flex px-8 py-3 mt-7 rounded-full cursor-pointer'>
  <p>"PURCHASE CREDITS"</p>
</div>
<div className='mt-7 flex md:flex-row flex-col gap-10 mb:mb-0 mb-10'>
  <div className='bg-neutral-600 flex flex-col gap-4 p-6 rounded-xl text-center w-[26vw]'>
    <img src={assets.wrench} alt="" className='w-10 filter invert mx-auto' />
    <h1 className='text-3xl font-bold text-neutral-200'>BASIC</h1>
    <p className='text-neutral-200 text-lg'>₹199 for 100 credits</p>
    <ul className='text-neutral-400 text-lg space-y-2 text-left'>
      <li>✔ Access to standard AI models</li>
      <li>✔ Up to 1024x1024 resolution</li>
      <li>✔ No priority processing</li>
    </ul>
    <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 cursor-pointer'>
      Buy Now
    </button>
  </div>

  <div className='bg-neutral-600 flex flex-col gap-4 p-6 rounded-xl text-center w-[26vw]'>
    <img src={assets.rocket} alt="" className='w-11 filter invert mx-auto' />
    <h1 className='text-3xl font-bold text-neutral-200'>STANDARD</h1>
    <p className='text-neutral-200 text-lg'>₹499 for 300 credits</p>
    <ul className='text-neutral-400 text-lg space-y-2 text-left'>
      <li>✔ Access to advanced AI models</li>
      <li>✔ Up to 1792x1024 resolution</li>
      <li>✔ Faster processing time</li>
    </ul>
    <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 cursor-pointer'>
      Buy Now
    </button>
  </div>
  
  <div className='bg-neutral-600 flex flex-col gap-4 p-6 rounded-xl text-center w-[26vw]'>
    <img src={assets.crown} alt="" className='w-11 filter invert mx-auto' />
    <h1 className='text-3xl font-bold text-neutral-200'>PREMIUM</h1>
    <p className='text-neutral-200 text-lg'>₹999 for 700 credits</p>
    <ul className='text-neutral-400 text-lg space-y-2 text-left'>
      <li>✔ Access to all AI models</li>
      <li>✔ Up to 2048x2048 resolution</li>
      <li>✔ Highest priority for processing</li>
    </ul>
    <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 cursor-pointer'>
      Buy Now
    </button>
  </div>
</div>
</div> */}