import React, { useEffect } from 'react'
import { useFirebase } from '../context/Firebase'

import { Link } from 'react-router-dom';


const Home = () => {

  const firebase = useFirebase();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await firebase.getData();

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  // console.log(firebase.currUser);
  return (
    <>
      <div className="text-5xl font-bold text-center text-black">Role Based Authentication</div>

      <button className='bg-green-500 p-2 rounded-md mb-10' type='submit' onClick={firebase.handleLogout}>Log out</button>

      <Link to="/article">Article</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/card">Card</Link>
      <Link to="/chat">Chat</Link>
      <Link to="/voice">Voice</Link>

      <div className='w-12 h-12 rounded-full relative flex items-center justify-center bg-blue-700 shadow-md cursor-pointer'>
        <p className='text-white text-lg'>{firebase.user?.email[0].toUpperCase()}</p>
      </div>

      <div className='absolute px-4 py-3 rounded-md bg-black right-0 top-14 flex flex-col items-center justify-start gap-3 w-64 pt-12'>
        <div className='w-12 h-12 rounded-full relative flex items-center justify-center bg-blue-700 shadow-md cursor-pointer'>
          <p className='text-white text-lg'>{firebase.user?.email[0].toUpperCase()}</p>
        </div>
        {
          firebase.currUser?.name && (
            <p className='text-lg text-white'>{firebase.currUser?.name}</p>
          )
        }
        <div className='w-full flex-col items-start felx gap-8 pt-6'>
          <Link><button className='bg-green-500 p-2 rounded-md mb-10' type='submit' onClick={firebase.handleLogout}>Log out</button></Link>
        </div>

      </div>


    </>
  )
}

export default Home