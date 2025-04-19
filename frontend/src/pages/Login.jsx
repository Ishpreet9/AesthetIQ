import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Login = () => {

  const { backendUrl, setUser } = useContext(AppContext);
  const [signedUp, setSignedUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='bg-neutral-700 md:mt-[5vw] mt-25 px-[5vw] md:py-[2.5vw] py-5 flex flex-col justify-center items-center rounded-xl'>
        <h1 className='text-neutral-200 md:text-[2.7vw] text-4xl font-bold'>{signedUp ? 'LOGIN' : 'SIGN UP'}</h1>
        <form onSubmit={onSubmitHandler} action="" className='flex flex-col md:gap-[1.5vw] gap-5 md:mt-[1.5vw] mt-5 justify-center items-center'>
          {signedUp || <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='bg-neutral-800 text-neutral-300 md:pl-[2vw] pl-5 pr-20 md:py-[1.4vw] py-4 rounded-lg md:text-[1.5vw] text-lg' placeholder='Enter username' />}
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='bg-neutral-800 text-neutral-300 md:pl-[2vw] pl-5 pr-20 md:py-[1.4vw] py-4 rounded-lg md:text-[1.5vw] text-lg' placeholder='Enter email' />
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='bg-neutral-800 text-neutral-300 md:pl-[2vw] pl-5 pr-20 md:py-[1.4vw] py-4 rounded-lg md:text-[1.5vw] text-lg' placeholder='Enter password' />
          <input type="submit" className='bg-neutral-900 text-neutral-300 md:text-[1.7vw] text-2xl font-bold md:px-[2vw] px-6 md:py-[0.8vw] py-2 rounded-full cursor-pointer' value={signedUp ? 'LOGIN' : 'SIGN UP'} />
        </form>
      </div>
      <p className='text-blue-400 mt-2 opacity-90 cursor-pointer' onClick={() => setSignedUp(!signedUp)}>{signedUp ? 'No account ? Sign up to continue' : 'Alerady signed up ? Login to continue...'}</p>
    </div>
  )
}

export default Login
