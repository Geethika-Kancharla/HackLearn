import React, { useState, useEffect } from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const firebase = useFirebase();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await firebase.signupUserWithEmailAndPassword(email, password);
        console.log("Successfull", result);
    }

    useEffect(() => {
        if (firebase.isLoggedIn) {
            console.log(firebase);
            navigate("/home");
        }
    }, [firebase, navigate])

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col h-screen justify-center items-center space-y-5'>
                <h1 className='text-3xl'>Sign Up </h1>
                <input type='email' placeholder='Enter the email' value={email} onChange={(e) => setEmail(e.target.value)} className='border border-black rounded-sm w-fit p-2'></input>
                <input type='password' placeholder='Enter the password' value={password} onChange={(e) => setPassword(e.target.value)} className='border border-black rounded-sm w-fit p-2'></input>
                <button className='bg-green-500 p-2 rounded-md' type='submit'>Sign Up</button>
            </div>
        </form>
    )
}

export default Register