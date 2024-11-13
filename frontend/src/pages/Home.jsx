import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
const {userInfo} = useSelector(state=>state.auth);

  return (
    <div>Welcome {userInfo?userInfo.username: "User"}</div>
  )
}

export default Home