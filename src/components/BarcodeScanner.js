import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import Quagga from 'quagga';
import axios from 'axios';
import { useFirebase } from '../context/Firebase';

const BarcodeScanner = () => {
    const webcamRef = useRef(null);
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState('Scanning for barcodes...');

    const firebase = useFirebase();

    const handleBarcodeDetected = (result) => {
        if (result && result.codeResult && result.codeResult.code) {
            setStatus(`Barcode detected: ${result.codeResult.code}`);
            fetchProductDetails(result.codeResult.code);
            Quagga.offDetected(handleBarcodeDetected);
        }
    };

    const fetchProductDetails = async (barcode) => {
        try {
            const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
            console.log('API Response:', response.data);
            if (response.data.status === 1) {
                const productData = response.data.product;
                console.log('Product Data:', productData);
                setProduct({
                    name: productData.product_name || 'N/A',
                    brand: productData.brands || 'N/A',
                    quantity: productData.quantity || 'N/A',
                    imageUrl: productData.image_url || null,
                });
                setStatus('Product details fetched successfully.');
                await firebase.handleCreateNewListing(product.name, product.quantity, product.brand, product.coverPic);
                console.log("Sent");
            } else {
                setStatus('Product not found.');
            }
        } catch (error) {
            console.error('API Error:', error);
            setStatus('Failed to fetch product details.');
        }
    };

    useEffect(() => {
        Quagga.init({
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: webcamRef.current.video,
                constraints: {
                    facingMode: 'environment',
                },
            },
            decoder: {
                readers: ['ean_reader'],
            },
        }, (err) => {
            if (err) {
                console.error(err);
                setStatus('Failed to initialize barcode scanner.');
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected(handleBarcodeDetected);

        return () => {
            Quagga.stop();
        };
    }, []);

    // useEffect(() => {
    //     console.log('Product:', product);
    // }, [product]); // Log product whenever it changes


    // BarcodeScanner.js:42 API Error: TypeError: Cannot read properties of null (reading 'name')
    // at fetchProductDetails (BarcodeScanner.js:36:1)



    return (
        <div>
            <h2>Barcode Scanner</h2>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ width: '40%', height: '40%' }}
            />
            <p>Status: {status}</p>
            {product && (
                <div>
                    <h3>Product Details</h3>
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%' }} />
                    ) : (
                        <p>No image available</p>
                    )}
                    <p><strong>Name:</strong> {product.name}</p>
                    <p><strong>Brand:</strong> {product.brand}</p>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                </div>
            )}
        </div>
    );
};

export default BarcodeScanner;