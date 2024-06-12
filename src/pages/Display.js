import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import Table from '../components/Table';

const Display = () => {
    const firebase = useFirebase();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const fetchedItems = await firebase.listAllItems();
            setItems(fetchedItems);
        };
        fetchItems();
    }, [firebase]);

    const handleItemDelete = (deletedItemId) => {
        setItems(items.filter(item => item.id !== deletedItemId));
    };

    return (
        <div>
            <h1>Displaying details here</h1>
            {items.map((item, index) => (
                <Table key={index} onItemDelete={handleItemDelete} {...item.data()} />
            ))}
        </div>
    );
}

export default Display;