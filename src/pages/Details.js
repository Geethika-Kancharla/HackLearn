import React, { useState } from 'react'
import { useFirebase } from '../context/Firebase';
import BarcodeScanner from '../components/BarcodeScanner';

const Details = () => {

    const [pname, setPname] = useState();
    const [quantity, setQuantity] = useState();
    const [ingredients, setIngredients] = useState();
    const [coverPic, setCoverPic] = useState();

    const firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted");
        console.log("Form values:", pname, quantity, ingredients, coverPic);
        await firebase.handleCreateNewListing(pname, quantity, ingredients, coverPic);
    }

    return (
        <div className='flex'>
            <div className='flex justify-center items-center'>
                <BarcodeScanner />
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col h-screen justify-center items-center space-y-5'>
                    <h1 className='text-3xl'>Sign Up </h1>
                    <input type='text' placeholder='Enter the Product name' value={pname} onChange={(e) => setPname(e.target.value)} className='border border-black rounded-sm w-fit p-2'></input>
                    <input type='text' placeholder='Enter the quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} className='border border-black rounded-sm w-fit p-2'></input>
                    <input type='text' placeholder='Enter the ingredients' value={ingredients} onChange={(e) => setIngredients(e.target.value)} className='border border-black rounded-sm w-fit p-2'></input>
                    <input type='file' placeholder='Enter the cover pic' onChange={(e) => setCoverPic(e.target.files[0])} className='border border-black rounded-sm w-fit p-2'></input>
                    <button className='bg-green-500 p-2 rounded-md' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Details