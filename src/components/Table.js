import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';

const Table = (props) => {
    const [url, setURL] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const firebase = useFirebase();

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then(url => setURL(url));
    }, [props.imageURL, firebase, deleted]);

    const handleDelete = (id) => {
        firebase.deleteItem(id)
            .then(() => {
                console.log('Document successfully deleted!');
                setDeleted(prevState => !prevState);
                props.onItemDelete(id);
            })
            .catch((error) => {
                console.error('Error removing document: ', error);
            });
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 white:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 white:bg-gray-700 white:text-gray-400">
                    <tr>
                        <th scope="col" className="px-16 py-3">
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ingredients
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b white:bg-gray-800 white:border-gray-700 hover:bg-gray-50 white:hover:bg-gray-600">
                        <td className="p-4">
                            <img src={url} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 white:text-white">
                            {props.pname}
                        </td>

                        <td className="px-6 py-4 font-semibold text-gray-900 white:text-white">
                            {props.ingredients}
                        </td>

                        <td className="px-6 py-4 font-semibold text-gray-900 white:text-white">
                            {props.quantity}
                        </td>

                        <td className="px-3 py-4 space-x-4">

                            <button className="font-medium text-blue-600 white:text-red-500 hover:underline" >View</button>
                            <button className="font-medium text-red-600 white:text-red-500 hover:underline" onClick={() => handleDelete(props.id)}>Remove</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Table;