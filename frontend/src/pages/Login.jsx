import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import OtpInput from '../components/OtpInput';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { backendUrl, setUser } = useContext(AppContext);
  const [signedUp, setSignedUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enterOtp,setEnterOtp] = useState(false);
  const [otpArr, setOtpArr] = useState(Array(6).fill(''));
  const [isOtpLoading,setIsOtpLoading] = useState(false);
  const navigate = useNavigate();
  

  const onSubmitHandler = async (e) => {
      e.preventDefault();
      //register user, first send otp to verify
      if (!signedUp) {
        try {
          setIsOtpLoading(true);
          //sending otp to email
          const response = await axios.post(backendUrl+'/api/mailer/send-otp',{ userEmail:email });
          if(response.data.success)
          {
            toast.success('OTP Sent To Specified Email');
            setEnterOtp(true);
          }
          else
          {
            toast.error(error);
            console.log('Unable to send otp!');
          }
        } catch (error) {
          toast.error('Error signing up user!');
          console.log(error);  
        } finally {
          setIsOtpLoading(false);
        }
      } 
      //else login user 
      else {
        await loginHandler();
      }
  }

  const userRegisterHandler = async() => {
    try {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          toast.success("User Registered Successfully. Login To Continue !");
          console.log("User Registered Successfully");
          setName('');
          setEmail('');
          setPassword('');
          setSignedUp(true);
          navigate('/');
        }
        else {
          toast.error("User Not Registered!")
          console.error("User Not Registered");
        }
    } catch (error) {
      toast.error("Invalid Email Or Password");
      console.error(error);
    }
  }

  const loginHandler = async() => {
    try {
      const response = await axios.post(backendUrl + '/api/user/login', { email, password },{ withCredentials: true});
      if (response.data.success) {
        toast.success("Login Successful");
        console.log("Login Successful");
        setUser(response.data.username);
        setEmail('');
        setPassword('');
        navigate('/');
      }
    } catch (error) {
      toast.error("Invalid Email Or Password");
      console.error(error);
    }
  }

  const verifyOtp = async (otpString) => {
    try {
      const response = await axios.post(backendUrl+'/api/mailer/verify-otp',{ userEmail:email, otp:otpString });
      if(response.data.success)
      {
        await userRegisterHandler();
      }
      else
      {
        toast.error('OTP incorrect or expired!');
        console.log('OTP incorrect or expired!');
      }
    } catch (error) {
      toast.error('Unable to verify otp!');
      console.log(error);
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpString = otpArr.join('');
    console.log('Otp Submitted : ',otpString);
    await verifyOtp(otpString);
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
          {signedUp || <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='bg-black/40 border-2 border-black text-neutral-300 md:px-[1.7vw] md:w-[23.5vw] pl-5 md:py-[1.2vw] py-4 rounded-md md:text-[1.5vw] text-lg outline-none focus:border-neutral-500 transition-all duration-500' placeholder='Enter username' />}
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='bg-black/40 border-2 border-black text-neutral-300 md:px-[1.7vw] md:w-[23.5vw] pl-5 md:py-[1.2vw] py-4 rounded-md md:text-[1.5vw] text-lg outline-none focus:border-neutral-500 transition-all duration-500' placeholder='Enter email' />
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='bg-black/40 border-2 border-black text-neutral-300 md:px-[1.7vw] md:w-[23.5vw] pl-5 md:py-[1.2vw] py-4 rounded-md md:text-[1.5vw] text-lg outline-none focus:border-neutral-500 transition-all duration-500' placeholder='Enter password' />
          {signedUp
          ?
          <button type="submit" className='bg-neutral-200 text-black md:text-[1.6vw] text-2xl font-semibold md:px-[2vw] px-6 md:py-[0.8vw] py-2 rounded-md cursor-pointer border-2 border-neutral-900 hover:bg-black/40 hover:border-neutral-400/90 hover:text-neutral-200 transition-all duration-400'>
            Login
          </button>  
          :
          <button type="submit" className='bg-neutral-200 text-black md:text-[1.6vw] text-2xl font-semibold md:px-[2vw] px-6 md:py-[0.8vw] py-2 rounded-md cursor-pointer border-2 border-neutral-900 hover:bg-black/40 hover:border-neutral-400/90 hover:text-neutral-200 transition-all duration-400'>
            {isOtpLoading 
            ? 
            <div className='flex gap-[1vw]'>
              <p>Sending OTP</p>
              <div className='w-[2vw] h-[2vw] border-3 border-neutral-400 rounded-full border-t-blue-600 animate-spin'></div>
            </div>
            :
            <p>Sign Up</p>
          }
          </button>
          }
        </form>
      </div>
      <p className='text-blue-400 mt-2 opacity-90 cursor-pointer' onClick={() => setSignedUp(!signedUp)}>{signedUp ? 'No account ? Sign up to continue' : 'Alerady signed up ? Login to continue...'}</p>
    </div>
  )
}

export default Login
