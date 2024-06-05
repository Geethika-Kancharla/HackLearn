import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import { useFirebase } from '../context/Firebase';

const Chat = () => {

    const firebase = useFirebase();

    const [message, setMessage] = useState();

    const currUser = firebase.currUser?.currUser;

    const handleSendMessage = (e) => {
        e.preventDefault();
        firebase.handleMessage(message);
        setMessage("");
    }

    return (
        <>
            <Card />
            <form onSubmit={handleSendMessage} className="mb-4">
                <div className="fixed bottom-0 left-0 w-full bg-gray-100 px-4 py-2 flex items-center justify-between">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    ></textarea>
                    <button type="submit" className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md">
                        Post
                    </button>
                </div>
            </form>
        </>
    )
}

export default Chat