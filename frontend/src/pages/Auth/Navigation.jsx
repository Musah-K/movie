import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutApiMutation } from '../../app/api/apiSlice';
import {Link, useNavigate} from 'react-router-dom';
import { logout } from '../../app/features/auth/authSlice';
import {MdOutlineLocalMovies} from 'react-icons/md';
import {AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd} from 'react-icons/ai'
import{FaChevronDown} from 'react-icons/fa'

const Navigation = () => {
  const {userInfo} = useSelector(state=> state.auth);
  const[dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const[logoutApi] = useLogoutApiMutation();

  const toggleDropdown = () =>{
    setDropdownOpen(!dropdownOpen);
  }

  const logoutHandler = async()=>{
    try {
      await logoutApi().unwrap();
      dispatch(logout())
    navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='fixed bottom-10 left-[2rem] tramsform translate-x-1/2 translate-y-1/2 z-50 bg-[#0f0f0f] border w-[30%] mb-[2rem] rounded '>
        <section className='flex justify-between items-center'>
          <div className='flex justify-center items-center mb-[2rem]'>
            <Link to="/" className='flex items-center transition-transform transform hover:translate-x-2'>
            <AiOutlineHome className='mr-2 mt-[3rem]' size={26}/>
            <span className='hidden nav-item-name mt-[3rem]'>Home</span>
            </Link>

            <Link to="/movies" className='flex items-center transition-transform transform hover:translate-x-2 ml-[1rem]'>
            <MdOutlineLocalMovies className='mr-2 mt-[3rem]' size={26}/>
            <span className='hidden nav-item-name mt-[3rem]'>Shop</span>
            </Link>
          </div>
          <div className='relative'>
            <button onClick={toggleDropdown} className='text-gray-800 focus:outline-none'>
              {userInfo?(<span className='text-white'>{userInfo.username}</span>):(<></>)}
              {userInfo && (<FaChevronDown
      className={`h-4 w-4 ml-1 transition-transform duration-200 ${
        dropdownOpen ? 'transform rotate-180' : ''
      }`}
      color="white"
    />)}
            </button>

            {dropdownOpen && userInfo && (
              <ul className={`absolute right-0 mt-2 mr-14 w-[10rem] space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? "-top-20": "-top-24"}`}>
                {userInfo.isAdmin && (<>
                  <li>
                    <Link to="/admin/movies/dashbord" className='block px-4 py-2 hover:bg-gray-100'>Dashbord</Link> </li> </>)}

                  <li>
                  <Link to="/profiles" className='block px-4 py-2 hover:bg-gray-100'>Profiles</Link>
                  </li>
                  <li>
                    <button onClick={logoutHandler} className='block w-full px-4 py-2 text-left hover:bg-gray-100'>
                      Logout
                    </button>
                  </li>
              </ul>
            )}

            {!userInfo &&(<ul className='flex'>
              <li>
                <Link to='/login' className='flex items-center mt-5 transition-transform transform hover:translate-x-2 mb-[2rem]'>
                  <AiOutlineLogin className='mr2 mt-[4px]' size={26} />
                  <span className='hidden nav-item-name'>Logon</span>
                </Link>
              </li>
              <li>
                <Link to='/register' className='flex items-center mt-5 transition-transform transform hover:translate-x-2 ml-[1rem]'>
                <AiOutlineUserAdd size={26}/>
                <span className='hidden nav-item-name'>Register</span></Link>
              </li>
            </ul>)}
          </div>
        </section>
    </div> 
  )
}

export default Navigation 