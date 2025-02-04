'use client'
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuthStore from '../utils/authUser';

const LoginForm = ({ onToggle }) => {
    const { login } = useAuthStore();
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setError('Please fill all the fields');
            return;
        }

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, formData);
            if (res.status !== 200) {
                throw new Error('Login failed');
            } else {
                const user = {
                    username: res.data.username,
                    email: res.data.email,
                    userId: res.data.userId
                };
                login(user);
                router.push('/');
            }
        } catch (err) {
            setError('Username or password is incorrect');
        }
    };

    return (
        <form className="space-y-4">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <input
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-3 rounded-md bg-gray-700 focus:outline-none focus:ring focus:ring-indigo-500"
            />
            <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 rounded-md bg-gray-700 focus:outline-none focus:ring focus:ring-indigo-500"
            />
            <button
                type="submit"
                onClick={handleLogin}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md transition"
            >
                Login
            </button>
            <p className="text-sm text-center">
                Don't have an account?{' '}
                <button
                    type="button"
                    onClick={onToggle}
                    className="text-indigo-400 hover:underline"
                >
                    Register
                </button>
            </p>
        </form>
    );
};

export default LoginForm;
