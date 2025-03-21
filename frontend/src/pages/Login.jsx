import React, { useContext, useState } from 'react'

const Login = () => {

  const [signedUp,setSignedUp] = useState(false);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='bg-neutral-700 mt-20 px-12 py-8 flex flex-col justify-center items-center rounded-xl'>
        <h1 className='text-neutral-200 text-4xl font-bold'>{signedUp ? 'LOGIN' : 'SIGN UP' }</h1>
        <form action="" className='flex flex-col gap-5 mt-5 justify-center items-center'>
            <input type="text" className='bg-neutral-800 text-neutral-300 pl-4 pr-20 py-4 rounded-lg text-lg' placeholder='Enter username' />
            {signedUp || <input type="email" className='bg-neutral-800 text-neutral-300 pl-4 pr-20 py-4 rounded-lg text-lg' placeholder='Enter email'/>}
            <input type="text" className='bg-neutral-800 text-neutral-300 pl-4 pr-20 py-4 rounded-lg text-lg' placeholder='Enter password' />
            <input type="submit" className='bg-neutral-900 text-neutral-300 text-2xl font-bold px-6 py-2 rounded-full cursor-pointer' value={signedUp ? 'LOGIN' : 'SIGN UP'}  />
        </form>
      </div>
      <p className='text-blue-400 mt-2 opacity-90 cursor-pointer' onClick={()=>setSignedUp(!signedUp)}>{signedUp ? 'No account ? Sign up to continue' : 'Alerady signed up ? Login to continue...'}</p>
    </div>
  )
}

export default Login
