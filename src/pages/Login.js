import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await firebase.signinUserWithEmailAndPassword(email, password);
        console.log("Successfull", result);
        console.log("Logged In");
    }

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate("/home");
        }
    }, [firebase, navigate])

    return (
        <>
            <div className='flex flex-col h-screen justify-center items-center space-y-5'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col justify-center items-center space-y-5'>
                        <h1 className='text-3xl'>Sign In </h1>
                        <input type='email' placeholder='Enter the email' value={email} onChange={(e) => setEmail(e.target.value)} className='border border-black rounded-sm w-fit p-2' />
                        <input type='password' placeholder='Enter the password' value={password} onChange={(e) => setPassword(e.target.value)} className='border border-black rounded-sm w-fit p-2' />
                        <button className='bg-green-500 p-2 rounded-md' type='submit'>Login</button>
                    </div>
                </form>
                <h1>Or</h1>
                <button className='bg-red-600 p-2 rounded-md' onClick={firebase.signinWithGoogle}>Sign in with Google</button>
            </div>
        </>
    )
}

export default Login