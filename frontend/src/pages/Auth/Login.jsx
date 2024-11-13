import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../app/api/apiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setCredentials } from '../../app/features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const[login,{isLoading}]=useLoginMutation();
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state=> state.auth);

  const {search} = useLocation();
  const searchParam = new URLSearchParams(search);
  const redirect = searchParam.get('redirect')|| "/"; 

  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }
  },[navigate,redirect,userInfo]);

  const handleLogin= async(e)=>{
    e.preventDefault();
    // if(!email || !password)toast.error('Input email or password')

      try {
        const res = await login({email,password}).unwrap();
        dispatch(setCredentials({...res}));
        navigate(redirect);
        toast.success('Successifully logged in')
  
      } catch (err) {
        toast.error(err?.data?.message || err.error)
    };
  }

  return (
    <div className='pl-[10rem] flex flex-wrap'>
      <div>
        <form className='container w-[40rem]' onSubmit={handleLogin} >
          <div className='my-[2rem]'>
            <label htmlFor="email" className='block text-sm font-medium text-white'>Enter email</label>
            <input type="email" 
            id="email"
            placeholder='Email'
            className='p-1'
            value={email}
            onChange={(e)=>setEmail(e.target.value)} />
          </div>

          <div className='my-[2rem]'>
            <label htmlFor="password" className='block text-sm font-medium text-white'>Enter passcode</label>
            <input type="password" 
            id="password"
            placeholder='Passcode'
            className='p-1'
            value={password}
            onChange={(e)=> setPassword(e.target.value)} />
          </div>
          <button className='bg-teal-500 text-white py-2 px-4 rounded tracking-widest hover:bg-teal-300 cursor-pointer'
          disabled={isLoading}>{isLoading?"Loggin in...":"Login"}</button>
        </form>
      </div>
    </div>
  )
}

export default Login