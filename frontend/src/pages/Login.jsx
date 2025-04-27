import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import OtpInput from '../components/OtpInput';

const Login = () => {

  const { backendUrl, setUser } = useContext(AppContext);
  const [signedUp, setSignedUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enterOtp,setEnterOtp] = useState(false);
  const [otpArr, setOtpArr] = useState(Array(6).fill(''));


  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      //register user if not registered
      if (!signedUp) {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          toast.success("User Registered Successfully");
          console.log("User Registered Successfully");
          setName('');
          setEmail('');
          setPassword('');
          setSignedUp(true);
        }
        else {
          toast.error("User Not Registered!")
          console.error("User Not Registered");
        }
      } //else login user 
      else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password },{ withCredentials: true});
        if (response.data.success) {
          toast.success("Login Successful");
          console.log("Login Successful");
          setUser(response.data.username);
          setEmail('');
          setPassword('');
        }
      }

    } catch (error) {
      toast.error("Invalid Email Or Password");
      console.error(error);
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpString = otpArr.join('');
    console.log('Otp Submitted : ',otpString);
    const otpValue = +otpString; //use otpValue for api call because changing any state here will cause error because of states being async 
    console.log('Otp: ',otpValue,typeof(otpValue)); 
  }

  return (
    enterOtp 
    ? 
    <div className='flex flex-col h-[87vh] justify-center items-center gap-[2vw] pb-[1vw]'>
      <p className='text-neutral-200 text-[2vw] font-semibold'>Enter OTP</p>
      <OtpInput handleOtpSubmit={handleOtpSubmit} otpArr={otpArr} setOtpArr={setOtpArr} />
    </div>
    :
    <div className='flex flex-col justify-center items-center'>
      <div className='bg-neutral-500/13 border-3 border-neutral-500/60 md:mt-[5vw] mt-25 md:px-[3vw] px-5 md:py-[2vw] py-5 flex flex-col justify-center items-center rounded-lg'>
        <h1 className='text-neutral-200 md:text-[2.7vw] text-4xl font-bold'>{signedUp ? 'LOGIN' : 'SIGN UP'}</h1>
        <form onSubmit={onSubmitHandler} action="" className='flex flex-col md:gap-[1.5vw] gap-5 md:mt-[1.5vw] mt-5 justify-center items-center'>
          {signedUp || <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='bg-black/40 border-2 border-black text-neutral-300 md:pl-[1.7vw] pl-5 pr-20 md:py-[1.2vw] py-4 rounded-md md:text-[1.5vw] text-lg outline-none focus:border-neutral-500 transition-all duration-500' placeholder='Enter username' />}
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='bg-black/40 border-2 border-black text-neutral-300 md:pl-[1.7vw] pl-5 pr-20 md:py-[1.2vw] py-4 rounded-md md:text-[1.5vw] text-lg outline-none focus:border-neutral-500 transition-all duration-500' placeholder='Enter email' />
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='bg-black/40 border-2 border-black text-neutral-300 md:pl-[1.7vw] pl-5 pr-20 md:py-[1.2vw] py-4 rounded-md md:text-[1.5vw] text-lg outline-none focus:border-neutral-500 transition-all duration-500' placeholder='Enter password' />
          <input type="submit" className='bg-neutral-200 text-black md:text-[1.6vw] text-2xl font-semibold md:px-[2vw] px-6 md:py-[0.8vw] py-2 rounded-full cursor-pointer border-2 border-neutral-900 hover:bg-black/40 hover:border-neutral-400/90 hover:text-neutral-200 transition-all duration-500' value={signedUp ? 'LOGIN' : 'SIGN UP'} />
        </form>
      </div>
      <p className='text-blue-400 mt-2 opacity-90 cursor-pointer' onClick={() => setSignedUp(!signedUp)}>{signedUp ? 'No account ? Sign up to continue' : 'Alerady signed up ? Login to continue...'}</p>
    </div>
  )
}

export default Login
