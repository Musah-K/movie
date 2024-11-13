import React,{useState,useEffect} from 'react'
import {Link, useLocation,useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../Loader';
import {setCredentials}from  '../../app/features/auth/authSlice';
import { useRegisterMutation } from '../../app/api/apiSlice';
import { toast } from 'react-toastify';

const Register = () => {
const [username, setUserName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword]= useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const dispatch = useDispatch();
const navigate = useNavigate();

const[register, {isLoading}] = useRegisterMutation();
const {userInfo} = useSelector(state=> state.auth);

const {search} =  useLocation();
const searchParam = new URLSearchParams(search);
const redirect = searchParam.get('redirect') || '/';

useEffect(()=>{
  if(userInfo){
    navigate(redirect)
  }
},[navigate, redirect, userInfo]);

const submitHandler = async (e)=>{
  e.preventDefault();

  if (!username || !email || !password || !confirmPassword) {
    toast.error("Please check all the fields.");
    return; // Stop submission if any field is empty
  }

  if(password !== confirmPassword){
    toast.error('Password do not match')
    return;
  }else{
    try {
      const res = await register({username, email, password}).unwrap()
      dispatch(setCredentials({...res}))
      navigate(redirect)
      toast.success('User successifully registered.')
    } catch (err) {
      console.log(err)
      toast.error(err.data.message)
    }
  }
}


  return (
    <div className='pl-[10rem] flex flex-wrap'>
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className='text-2xl font-semibold mb-4'>Register</h1>

        <form onSubmit={submitHandler} className='container w-[40rem]'>

          <div className='my-[2rem]'>
            <label htmlFor="name" className='block text-sm font-medium text-white'>name</label>
            <input type="text" id='name' className='mt-1 p-1 border rounded w-full outline-none' placeholder='Enter Name' value={username} onChange={(e) =>setUserName(e.target.value)} />
          </div>

          <div className='my-[2rem]'>
            <label htmlFor="email" className='block text-sm font-medium text-white'>Email</label>
            <input type="email" id='email' className='mt-1 p-1 border rounded w-full' placeholder='Enter email' value={email} onChange={(e) =>setEmail(e.target.value)} />
          </div>

          <div className='my-[2rem]'>
            <label htmlFor="password" className='block text-sm font-medium text-white'>Password</label>
            <input type="password" id='password' className='mt-1 p-1 border rounded w-full' placeholder='Enter password' value={password} onChange={(e) =>setPassword(e.target.value)} />
          </div>

          <div className='my-[2rem]'>
            <label htmlFor="confirm_password" className='block text-sm font-medium text-white'>Confirm password</label>
            <input type="password" id='confirm_password' className='mt-1 p-1 border rounded w-full' placeholder='Confirm Password' value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)} />
          </div>

          <button disabled={isLoading} type='submit' className='bg-teal-500 text-white px-4 py-2 cursor-pointer my-[1rem] rounded' >{isLoading?"Registering...":"Register"}</button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <p className="text-white">
            Already have an account? {" "} <Link to={redirect ? `/login?redirect=${redirect}`: '/login'} className='text-teal-500 hover:underline'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register