import React from 'react'
import { useFirebase } from '../context/Firebase'

const Home = () => {

  const firebase = useFirebase();
  console.log(firebase);

  return (
    <>
      <div className="text-5xl font-bold text-center text-black">Role Based Authentication</div>

      <button className='bg-green-500 p-2 rounded-md' type='submit' onClick={firebase.handleLogout}>Log out</button>
    </>
  )
}

export default Home