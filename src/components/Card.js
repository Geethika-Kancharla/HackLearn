import React, { useState, useEffect } from 'react'
import { useFirebase } from '../context/Firebase';

const Card = (props) => {

    // const [url, setURL] = useState(null);
    // const firebase = useFirebase();

    // useEffect(() => {
    //     firebase.getImageURL(props.imageURL).then(url => setURL(url));
    // }, [])

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6 m-3">
            {/* <h2 className="text-xl font-semibold mb-2">{props.pname}</h2>
            <p className="text-sm text-gray-500 mb-4">{props.ingredients}</p>
            <img src={url} className='h-14 w-14' />
            <p className="text-base text-gray-700">{props.quantity}</p> */}
        </div>
    )
}

export default Card