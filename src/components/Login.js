import React, { useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import LoginImage from '../assets/Login.json';
import Success from '../assets/Success.json';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};

        if (!identifier) errors.identifier = 'Email or Username is required';
        if (!password) errors.password = 'Password is required';

        return errors;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.get(`http://localhost:5000/users?${identifier.includes('@') ? `email=${identifier}` : `username=${identifier}`}`);
            const user = response.data[0];

            if (user && user.password === password) {
                dispatch({ type: 'LOGIN_SUCCESS', payload: user });
                setTimeout(() => {
                    navigate('/welcome');
                }, 3000);
            } else {
                setErrors({ identifier: 'Invalid email/username or password' });
                dispatch({ type: 'LOGIN_FAIL', payload: 'Invalid email/username or password' });
                setIsLoading(false);
            }
        } catch (error) {
            setErrors({ general: error.message });
            dispatch({ type: 'LOGIN_FAIL', payload: error.message });
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-center h-[100vh] bg-[#18534b]">
            <div className="w-full md:w-1/2 bg-black h-[100vh] flex justify-center items-center">
                <Lottie animationData={LoginImage} />
            </div>
            <div className="md:w-1/2 max-w-md mx-auto mt-10 p-6 bg-white shadow-2xl rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
                <form onSubmit={handleLogin}>
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Email or Username"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className={`w-full px-3 py-2 border ${errors.identifier ? 'border-red-500' : 'border-gray-300'} rounded`}
                        />
                        <FontAwesomeIcon icon={identifier.includes('@') ? faEnvelope : faUser} className="absolute right-3 top-3 text-[#4784c1]" />
                        {errors.identifier && <p className="text-red-500 text-xs mt-1">{errors.identifier}</p>}
                    </div>
                    <div className="relative mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
                        />
                        <FontAwesomeIcon icon={faLock} className="absolute right-3 top-3 text-[#4784c1]" />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    {errors.general && <p className="text-red-500 text-center mb-4">{errors.general}</p>}
                    <button type="submit" className="w-full bg-[#32834f] text-white px-3 py-2 rounded hover:bg-green-600 flex items-center justify-center">
                        {isLoading ? (
                            <Lottie animationData={Success} style={{ width: 40, height: 40 }} />
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;