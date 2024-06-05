import React, { useState, useEffect } from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [role, setRole] = useState();
    const [phno, setPhno] = useState();

    const firebase = useFirebase();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await firebase.addUser(email, password, name, role, phno);
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
                <input type='text' placeholder='Enter the name' value={name} onChange={(e) => setName(e.target.value)} className='border border-black rounded-sm w-fit p-2'></input>
                <input type='text' placeholder='Enter the role' value={role} onChange={(e) => setRole(e.target.value)} className='border border-black rounded-sm w-fit p-2'></input>
                <input type='tel' placeholder='Enter the phone number' value={phno} onChange={(e) => setPhno(e.target.value)} className='border border-black rounded-sm w-fit p-2'></input>
                <input type='email' placeholder='Enter the email' value={email} onChange={(e) => setEmail(e.target.value)} className='border border-black rounded-sm w-fit p-2'></input>
                <input type='password' placeholder='Enter the password' value={password} onChange={(e) => setPassword(e.target.value)} className='border border-black rounded-sm w-fit p-2'></input>
                <button className='bg-green-500 p-2 rounded-md' type='submit'>Sign Up</button>
                <p>Already have an account<Link to="/"> Click here to login</Link></p>
            </div>
        </form>
    )
}

export default Register