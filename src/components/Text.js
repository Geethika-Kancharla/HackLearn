import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Text = () => {
    const { transcript, listening, reset, browserSupportsSpeechRecognition, error } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Your browser does not support Speech Recognition.</span>;
    }

    if (error) {
        return <span>Error: {error.message}</span>;
    }

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

    const stopListening = () => SpeechRecognition.stopListening();

    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <h2>Speech to Text Converter</h2>
            <br />
            <div className="w-4/5 h-3/6 mx-auto bg-white shadow-lg rounded-md p-6 m-3">
                {listening ? <span>Listening...</span> : transcript}
            </div>

            <div className='flex space-x-10'>
                <button className='p-2 bg-blue-300 rounded-lg' disabled={!transcript} onClick={() => navigator.clipboard.writeText(transcript)}>Copy to Clipboard</button>
                <button className='p-2 bg-blue-300 rounded-lg' onClick={listening ? stopListening : startListening}>
                    {listening ? 'Stop Listening' : 'Start Listening'}
                </button>
                <button className='p-2 bg-blue-300 rounded-lg' onClick={reset}>Reset</button>
            </div>
        </div>
    )
}

export default Text;

