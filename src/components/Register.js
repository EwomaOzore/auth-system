import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faIdBadge } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'lottie-react';
import LoginImage from '../assets/Login.json';
import Success from '../assets/Success.json';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;

    const validateForm = () => {
        const errors = {};
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

        if (!firstName) errors.firstName = 'First Name is required';
        if (!lastName) errors.lastName = 'Last Name is required';
        if (!username) errors.username = 'Username is required';
        if (!email) errors.email = 'Email is required';
        if (!password) errors.password = 'Password is required';
        if (!confirmPassword) errors.confirmPassword = 'Confirm Password is required';

        if (password && !passwordRegex.test(password)) {
            errors.password = 'Password must be at least 7 characters long and contain a number and a special character';
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsLoading(true);

        try {
            const emailResponse = await axios.get(`${API_URL}/users?email=${email}`);
            if (emailResponse.data.length > 0) {
                setErrors({ email: 'Account already exists' });
                setIsLoading(false);
                return;
            }

            const usernameResponse = await axios.get(`${API_URL}/users?username=${username}`);
            if (usernameResponse.data.length > 0) {
                setErrors({ username: 'Username already in use' });
                setIsLoading(false);
                return;
            }

            const response = await axios.post(`${API_URL}/users`, {
                firstName,
                lastName,
                username,
                email,
                password,
            });
            dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
            // Add a delay before navigating
            setTimeout(() => {
                navigate('/registration-success');
            }, 1500); // 1.5 second delay
        } catch (error) {
            dispatch({ type: 'REGISTER_FAIL', payload: error.message });
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-[100vh] bg-[#18534b]">
            <div className='w-1/2 bg-black h-[100vh] flex justify-center items-center'>
                <Lottie animationData={LoginImage} />
            </div>
            <div className="w-1/2 max-w-md mx-auto mt-10 p-6 bg-white shadow-2xl rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
                <form onSubmit={handleRegister}>
                    <div className="flex mb-4 space-x-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                            <FontAwesomeIcon icon={faIdBadge} className="absolute right-3 top-3 text-[#4784c1]" />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                            <FontAwesomeIcon icon={faIdBadge} className="absolute right-3 top-3 text-[#4784c1]" />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded`}
                        />
                        <FontAwesomeIcon icon={faUser} className="absolute right-3 top-3 text-[#4784c1]" />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                    </div>
                    <div className="relative mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                        />
                        <FontAwesomeIcon icon={faEnvelope} className="absolute right-3 top-3 text-[#4784c1]" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                    <div className="relative mb-4">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded`}
                        />
                        <FontAwesomeIcon icon={faLock} className="absolute right-3 top-3 text-[#4784c1]" />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                    <button type="submit" className="w-full bg-[#32834f] text-white px-3 py-2 rounded hover:bg-green-600 flex items-center justify-center">
                        {isLoading ? (
                            <Lottie animationData={Success} style={{ width: 30, height: 30 }} />
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account? <Link to="/" className="text-blue-500 hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;