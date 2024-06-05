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


  return (
    <>
      <div className="text-5xl font-bold text-center text-black">Role Based Authentication</div>

      <button className='bg-green-500 p-2 rounded-md mb-10' type='submit' onClick={firebase.handleLogout}>Log out</button>

      <Link to="/article">Article</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/card">Card</Link>
      <Link to="/chat">Chat</Link>

    </>
  )
}

export default Home