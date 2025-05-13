import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify';
import axios from 'axios'

const Profile = () => {

  const { user, credits, backendUrl, setUser, setCredits, getCredits } = useContext(AppContext);
  const navigate = useNavigate();
  const [changePwd, setChangePwd] = useState(false);
  const [newUsername,setNewUsername] = useState('');
  const [oldPassword,setOldPassword] = useState('');
  const [newPassword,setNewPassword] = useState('');
  const [oldPasswordVisible,setOldPasswordVisible] = useState(false);
  const [newPasswordVisible,setNewPasswordVisible] = useState(false);
  const [deleteConfirmation,setDeleteConfirmation] = useState(false);

  const accountDelete = async() => {
    try {
      const response = await axios.post(backendUrl+'/api/user/delete-account',{},{withCredentials:true});
      if(response.data.success)
      {
        toast.success('Account Deleted Permanently');
        navigate('/');
        console.log('Account deleted successfully');
      }
      else
      {
        toast.error(response.data.message || 'Unable to delete account');
        console.log(response.data.message || 'Unable to delete account');
      }
    } catch (error) {
      toast.error('Unable to delete account due to some error!');
      console.log(error);
    }
  }

  const passwordChange = async() => {
    try {
      const response = await axios.post(backendUrl+'/api/user/change-password',{oldPassword,newPassword},{withCredentials:true});
      if(response.data.success)
      {
        setChangePwd(false);
        setOldPassword('');
        setNewPassword('');
        toast.success('Password Changed Successfully');
        console.log('Password changed');
      }
      else
      {
        toast.error(response.data.message || 'Unable to change password!');
        console.log(response.data.message || 'Unable to change password!');
      }
    } catch (error) {
      toast.error('Unable to change password due to some error!');
      console.log(error);
    }
  }

  const usernameChange = async() => {
    try {
      const response = await axios.post(backendUrl+'/api/user/change-username',{newUsername},{withCredentials:true});
      if(response.data.success)
      {
        toast.success('Username Changed Successfully');
        setNewUsername('');
        getCredits();
        console.log('Username changed');
      }
      else
      {
        toast.error(response.data.message || 'Error changing username');
        console.log(response.data.error || 'Unknown error');
      }
    } catch (error) {
      toast.error('Unable to change username due to some error!')
      console.log(error);
    }
  }

  const logout = () => {
    setUser(null);
    setCredits(null);
  }
  const logoutHandler = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/user/logout', {}, {
        withCredentials: true
      });
      if (response.data.success) {
        logout();
        navigate('/');
        console.log('User logged out successfully');
      }
      else {
        console.log('Logout failed');
      }
    } catch (err) {
      console.error('Logout error: ', err)
    }
  }

  return (
    <div className='text-white flex flex-col items-start mx-[5vw] gap-[2vw]'>
      {deleteConfirmation && 
      <div className='fixed z-10 inset-0 w-screen h-screen flex items-center justify-center bg-white/10 backdrop-blur-lg'>
        <div className='flex flex-col bg-neutral-900 gap-[2vw] px-[3vw] py-[3vw] rounded-lg'> 
          <p className='text-[1.4vw]'>Are you sure you want to delete your account ?</p>
          <div className='flex justify-around'>
          <button onClick={()=>accountDelete()} className='px-[1vw] py-[1vh] text-[1.4vw] text-white font-semibold rounded-md cursor-pointer bg-red-600'>
            DELETE
          </button> 
          <button onClick={()=>setDeleteConfirmation(false)} className='px-[1vw] py-[1vh] text-[1.4vw] text-black font-semibold rounded-md cursor-pointer bg-neutral-200'>
            CANCEL
          </button>
          </div>
        </div>
      </div>
      }
      {/* user details, account change and change details*/}
      <div className='w-full flex justify-around items-start mt-[3vw]'>
        {/* user details and credits and account */}
        <div className='flex flex-col items-start gap-[2vw]'>
          <div className='flex flex-col inline-block items-center'>
            <img src={assets.profile} alt="" className='w-[5vw] invert border-3 rounded-full' />
            <p className='font-semibold text-[2.3vw]'>{user}</p>
            <p>useremail@mail.com</p>
          </div>
          <div className='bg-neutral-700 px-[1.5vw] py-[1vw] flex items-center gap-[1.1vw] rounded-md'>
            <p className='text-[1.4vw]'>Credits : </p>
            <div className='bg-neutral-800 flex items-center py-[0.5vw] px-[1vw] gap-[0.7vw] text-[1.4vw] rounded-sm'>
              <p>{credits}</p>
              <img src={assets.flame} alt="" className='w-[2vw]' />
            </div>
            <NavLink to={'/buy'} className='bg-blue-500 px-[1vw] py-[0.5vw] rounded-md font-semibold cursor-pointer hover:bg-blue-400 transition-all duration-300'>
              BUY MORE
            </NavLink>
          </div>
          {/* logout and delete account */}
          <div className='flex flex-col items-start gap-[1.2vw] mt-[3vw]'>
            {/* logout button */}
            <button onClick={logoutHandler} className='bg-white text-black text-[1.5vw] border-2 border-black font-semibold px-[1.3vw] py-[0.5vw] rounded-md cursor-pointer hover:bg-neutral-900 hover:text-neutral-200 hover:border-neutral-200 transition-all duration-400'>
              LogOut
            </button>
            {/* delete account */}
            <div className='flex flex-col'>
              <p className='text-red-400'>Delete Account ?</p>
              <div className='flex flex-col items-start gap-[0.5vw] border-1 border-red-400 p-[0.7vw] rounded-md'>
                <div className='flex items-center gap-[0.3vw] px-[0.3vw]'>
                <img src={assets.danger} alt="" className='w-[1.5vw] h-[1.5vw]'/>
                <p className='text-[1.2vw] text-red-400'>This action is permanent and can't be rolled back</p>
                </div>
                <button onClick={()=>setDeleteConfirmation(true)} className='bg-red-600 text-neutral-200 text-[1.3vw] font-semibold p-[0.5vw] rounded-md cursor-pointer border-2 border-red-600 hover:border-black hover:text-black transition-all duration-500'>
                  DELETE ACCOUNT
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* change details */}
        <div className='flex flex-col justify-center gap-[1.5vw] mt-[5vw]'>
          {/* change username */}
          <div className='flex items-center gap-[1vw] text-[1.45vw] bg-neutral-700 px-[1.1vw] p-[1vw] rounded-md'>
            <p>Edit Name </p>
            <input type="text" onChange={(e)=>setNewUsername(e.target.value)} value={newUsername} className='bg-neutral-900 px-[1vw] py-[0.9vh] outline-none border-2 border-neutral-900 focus:border-neutral-500 transition-all duration-500 rounded-md' placeholder='Enter new username' />
            <button onClick={()=>usernameChange()} className='bg-yellow-600 px-[1vw] py-[0.5vw] rounded-md font-medium cursor-pointer hover:bg-yellow-500 transition-all duration-300'>
              CONFIRM
            </button>
          </div>
          {/* change password */}
          {
            changePwd
              ?
              <div className='relative flex flex-col items-center bg-neutral-700 p-[1vw] gap-[1vw] rounded-md'>
                <img onClick={() => setChangePwd(false)} src={assets.cross} alt="" className='invert opacity-60 absolute cursor-pointer w-[2vw] right-[1.2vw] p-[0.2vw] rounded-md' />
                <p>Change Password</p>
                <div className='flex justify-center items-center gap-[1vw] bg-neutral-900 w-[22vw] border-2 border-neutral-900 rounded-md focus-within:border-neutral-500 transition-all duration-500 pr-[1.7vw]'>
                <input type={oldPasswordVisible ? 'text' : 'password'} onChange={(e)=>setOldPassword(e.target.value)} value={oldPassword} className='pl-[1.7vw] py-[0.7vw] text-[1.4vw] outline-none' placeholder='Enter Old Password' />
                {
                  oldPasswordVisible ? 
                  <img onClick={()=>setOldPasswordVisible(false)} src={assets.eyeVisible} alt="" className='w-[2.2vw] invert opacity-40 cursor-pointer' />
                  :
                  <img onClick={()=>setOldPasswordVisible(true)} src={assets.eyeHidden} alt="" className='w-[2.2vw] invert opacity-40 cursor-pointer' />
                }
                </div>
                <div className='flex justify-center items-center gap-[1vw] bg-neutral-900 w-[22vw] border-2 border-neutral-900 rounded-md focus-within:border-neutral-500 transition-all duration-500 pr-[1.7vw]'>
                <input type={newPasswordVisible ? 'text' : 'password'} onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} className='pl-[1.7vw] py-[0.7vw] text-[1.4vw] outline-none' placeholder='Enter New Password' />
                {
                  newPasswordVisible ? 
                  <img onClick={()=>setNewPasswordVisible(false)} src={assets.eyeVisible} alt="" className='w-[2.2vw] invert opacity-40 cursor-pointer' />
                  :
                  <img onClick={()=>setNewPasswordVisible(true)} src={assets.eyeHidden} alt="" className='w-[2.2vw] invert opacity-40 cursor-pointer' />
                }
                </div>                
                <button onClick={()=>passwordChange()} className='bg-yellow-600 px-[1vw] py-[0.5vw] rounded-md font-medium cursor-pointer hover:bg-yellow-500 transition-all duration-300'>
                  CONFIRM
                </button>
              </div>
              :
              <div className='flex items-center justify-center gap-[1vw] bg-neutral-700 p-[1vw] rounded-md'>
                <p className='text-[1.3vw]'>Want to create a new password ? </p>
                <button onClick={() => setChangePwd(true)} className='bg-yellow-600 px-[1vw] py-[0.5vw] rounded-md font-medium cursor-pointer hover:bg-yellow-500 transition-all duration-300'>
                  CHANGE PASSWORD
                </button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Profile
