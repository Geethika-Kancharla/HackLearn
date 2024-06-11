import React, { useState, useEffect } from 'react'
import { useFirebase } from '../context/Firebase'
import Card from '../components/Card';

const Display = () => {

    const firebase = useFirebase();
    const [items, setItems] = useState([]);


    useEffect(() => {
        firebase.listAllItems().then((items) => setItems(items.docs));

    }, [])

    return (
        <div>
            <h1>Displaying details here</h1>
            {
                items.map((item, index) =>
                    <>
                        <Card key={index} {...item.data()} />
                    </>
                )
            }
        </div >


    )
}

export default Display