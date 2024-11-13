import React, { useEffect, useState } from 'react'
import { useUpdateProfileMutation } from '../../app/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../../app/features/auth/authSlice';

const Profile = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {userInfo}= useSelector(state => state.auth);
    const dispatch =useDispatch();
    const[updateProfile,{isLoading}]=useUpdateProfileMutation()

useEffect(()=>{
    setUserName(userInfo.username);
    setEmail(userInfo.email);
},[userInfo.username, userInfo.email])

const handleSubmit = async(e)=>{
e.preventDefault();

if(password !== confirmPassword){
    toast.error('Password does not match');
    return;
}

const updateData = {
    _id: userInfo._id,
    username,
    email
}
if(password){
    updateData.password = password;
}
    try {

        const res = await updateProfile(updateData).unwrap();
    dispatch(setCredentials({ ...res }));
    toast.success('Profile updated successfully');
        
    }catch (err) {
        toast.error(err?.data?.message || 'Failed to update profile');
    }
}

  return (
    <div>
        <h3 className='block px-[50%]'>Profiles</h3>
        <form onSubmit={handleSubmit}>
            <div className='pl-3 my-5'>
                <label className='block text-sm'>Update Name</label>
                <input type="text" className='rounded p-1' value={username} onChange={(e)=>setUserName(e.target.value)} placeholder='enter Name' />
            </div>
            <div className='pl-3 my-5'>
                <label className='block text-sm'>Update Email</label>
                <input type="email" className='rounded p-1' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter Email' />
            </div>
            <div className='pl-3 my-5'>
                <label className='block text-sm'>Update password</label>
                <input type="password" className='rounded p-1' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter password' />
            </div>
            <div className='pl-3 my-5'>
                <label className='block text-sm'>Confirm password</label>
                <input type="password" className='rounded p-1' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm password' />
            </div>
            <button className='bg-teal-500 rounded px-4 py-2 text-white hover:bg-teal-300 ml-4' disabled={isLoading}>{isLoading?'Updating...':'Update'}</button>
            
        </form>
    </div>
  )
}

export default Profile