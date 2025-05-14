import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ({handleOtpSubmit,otpArr,setOtpArr}) => {
  const inputRefs = useRef([]);
  
  const handleChange = (e,index) => {
   let value = e.target.value;

   value = value.replace(/[^0-9]/g,'');
   e.target.value = value;
   const newOtpArr = [...otpArr];
   newOtpArr[index] = value;
   setOtpArr(newOtpArr);
    
   if(value && index < 5) //check if value exist and index is not last index
    {
      inputRefs.current[index+1].focus();
    } 
  }

  const handleOnKeyUp = (e,index) => {
    if(e.key === 'Backspace' && !e.target.value && index>0)
      {
        const newOtpArr = [...otpArr];
        newOtpArr[index] = '';
        setOtpArr(newOtpArr);
        inputRefs.current[index-1].focus();
      } 
  }

  const handlePaste = (e) =>
  {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0,6);

    if(/^\d+$/.test(pastedData)){
      const newOtpArr = [...otpArr];
      pastedData.split('').forEach((char,i) => {
        if (i<6){
          newOtpArr[i] = char; 
          inputRefs.current[i].value = char;
        }
      }); 
      setOtpArr(newOtpArr); 
    }
  }

  useEffect(()=>{
    inputRefs.current[0].focus();
  },[])
  
  return (
    <form onSubmit={(e)=>handleOtpSubmit(e)} className='flex flex-col items-center md:gap-[4vw] gap-12'> 
      <div className='flex md:gap-[1vw] gap-2'>
      {
        Array(6).fill(0).map((_,index)=>(
          <input onKeyUp={(e)=>handleOnKeyUp(e,index)} onChange={(e)=>handleChange(e,index)} onPaste={(e)=>handlePaste(e)} ref={(el)=>inputRefs.current[index]=el} type="text" inputMode='numeric' pattern='[0-9]' maxLength='1' key={index} required className='md:w-[6vw] md:h-[6vw] w-12 h-12 md:text-[2vw] text-xl text-neutral-200 bg-neutral-700/90 border-2 border-neutral-500 no-spinners text-center rounded-md'/>
        ))
      }
      </div>
      <button type='submit' className='bg-neutral-200 md:text-[1.5vw] text-2xl font-semibold rounded-md border-2 border-black px-[4vw] py-[1vw] transition-all duration-500 hover:bg-neutral-700/90 hover:text-neutral-200 hover:border-neutral-300 cursor-pointer'>SUBMIT</button>
    </form>
  )
}

export default OtpInput
