import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate, Link } from 'react-router-dom';


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

    const handlePasswordReset = () => {
        const email = prompt("Please enter your email");
        firebase.sendPReset(email);
        alert("Email Sent Check your inbox");
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
                        <p className='text-blue-400 cursor-pointer' onClick={handlePasswordReset}>Forgot password</p>
                    </div>

                </form>
                <h1>Or</h1>
                <button className='bg-red-600 p-2 rounded-md' onClick={firebase.signinWithGoogle}>Sign in with Google</button>
                <p>Already have an account<Link to="/register"> Click here to register</Link></p>
            </div>
        </>
    )
}

export default Login