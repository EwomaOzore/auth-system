import React from 'react';
import { Link } from 'react-router-dom';
import RegSuccess from '../assets/RegSuccess.json';
import Lottie from 'lottie-react';

const RegistrationSuccess = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-md p-6 bg-white shadow-2xl rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-6">Registration Successful</h2>
            <Lottie animationData={RegSuccess} />
            <p className="my-5">Thank you for registering! You can now log in to your account.</p>
            <Link to="/" className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
                Go to Login
            </Link>
        </div>
        </div>
    );
};

export default RegistrationSuccess;