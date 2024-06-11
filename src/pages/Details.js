import React, { useState } from 'react'
import { useFirebase } from '../context/Firebase';

const Details = () => {

    const [pname, setPname] = useState();
    const [quantity, setQuantity] = useState();
    const [ingredients, setIngredients] = useState();
    const [coverPic, setCoverPic] = useState();

    const firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted");
        await firebase.handleCreateNewListing(pname, quantity, ingredients, coverPic);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col h-screen justify-center items-center space-y-5'>
                <h1 className='text-3xl'>Sign Up </h1>
                <input type='text' placeholder='Enter the Product name' value={pname} onChange={(e) => setPname(e.target.value)} className='border border-black rounded-sm w-fit p-2'></input>
                <input type='text' placeholder='Enter the quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} className='border border-black rounded-sm w-fit p-2'></input>
                <input type='text' placeholder='Enter the ingredients' value={ingredients} onChange={(e) => setIngredients(e.target.value)} className='border border-black rounded-sm w-fit p-2'></input>
                <input type='file' placeholder='Enter the cover pic' value={coverPic} onChange={(e) => setCoverPic(e.target.files[0])} className='border border-black rounded-sm w-fit p-2'></input>
                <button className='bg-green-500 p-2 rounded-md' type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default Details