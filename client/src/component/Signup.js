// Signup.js
import React, { useState } from 'react';
import axios from 'axios';

function Signup({ apiUrl, onToggleSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/signup`, { email, password });
            if (response.status === 201) {
                setSuccess('User created successfully! You can log in now.');
                setEmail('');
                setPassword('');
                setError('');
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            setError(error.response.data.message || 'Sign-up failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="Email" className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Enter Email'
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="Password" className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Enter Password'
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account? 
                    <button 
                        onClick={onToggleSignup}
                        className="text-blue-600 hover:underline"
                    >
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Signup;
