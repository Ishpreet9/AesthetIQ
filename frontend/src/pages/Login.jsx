import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../context/AppContext';

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
          console.log("User registered successfully");
          setName('');
          setEmail('');
          setPassword('');
          setSignedUp(true);
        }
        else {
          console.error("User not registered");
        }
      } //else login user 
      else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password },{ withCredentials: true});
        if (response.data.success) {
          console.log("Login successful")
          setUser(response.data.username);
          setEmail('');
          setPassword('');
        }
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='bg-neutral-700 mt-20 px-12 py-8 flex flex-col justify-center items-center md:rounded-xl'>
        <h1 className='text-neutral-200 text-4xl font-bold'>{signedUp ? 'LOGIN' : 'SIGN UP'}</h1>
        <form onSubmit={onSubmitHandler} action="" className='flex flex-col gap-5 mt-5 justify-center items-center'>
          {signedUp || <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='bg-neutral-800 text-neutral-300 pl-4 pr-20 py-4 rounded-lg text-lg' placeholder='Enter username' />}
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='bg-neutral-800 text-neutral-300 pl-4 pr-20 py-4 rounded-lg text-lg' placeholder='Enter email' />
          <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} className='bg-neutral-800 text-neutral-300 pl-4 pr-20 py-4 rounded-lg text-lg' placeholder='Enter password' />
          <input type="submit" className='bg-neutral-900 text-neutral-300 text-2xl font-bold px-6 py-2 rounded-full cursor-pointer' value={signedUp ? 'LOGIN' : 'SIGN UP'} />
        </form>
      </div>
      <p className='text-blue-400 mt-2 opacity-90 cursor-pointer' onClick={() => setSignedUp(!signedUp)}>{signedUp ? 'No account ? Sign up to continue' : 'Alerady signed up ? Login to continue...'}</p>
    </div>
  )
}

export default Login
