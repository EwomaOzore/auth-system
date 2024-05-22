import React from 'react';
import { useSelector } from 'react-redux';
import WelcomeImage from '../assets/WelcomePage.json';
import Lottie from 'lottie-react';

const Welcome = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md p-6 bg-white shadow-2xl rounded-2xl text-center">
                <h2 className="text-2xl font-bold mb-6">Welcome</h2>
                <p className="mb-4">Hello, <span className='font-semibold'>{user.username}</span>!</p>
                <p>Welcome to your page.</p>
                <div className="mt-6">
                    <Lottie animationData={WelcomeImage} />
                </div>
            </div>
        </div>
    );
};

export default Welcome;
