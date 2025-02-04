'use client'
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuthStore from '../utils/authUser';

const RegisterForm = ({ onToggle }) => {
    const  {login}  = useAuthStore();
    const router = useRouter();
    const [formData, setFormData] = useState({ premium: false });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!formData.username || !formData.email || !formData.password) {
            setError('Please fill all the fields');
            return;
        }

        if (!formData.email.endsWith("@gmail.com")) {
            setError("Email must end with @gmail.com");
            return;
        }

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, formData);
            if (res.status !== 200) {
                throw new Error('Registration failed');
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
            setError('Username already exists');
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
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email (must end with @gmail.com)"
                className="w-full p-3 rounded-md bg-gray-700 focus:outline-none focus:ring focus:ring-indigo-500"
            />
            <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 rounded-md bg-gray-700 focus:outline-none focus:ring focus:ring-indigo-500"
            />
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={formData.premium}
                    id="premium"
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, premium: e.target.checked }))
                    }
                    className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                />
                <label htmlFor="premium" className="ml-2 text-sm">
                    Premium Account
                </label>
            </div>
            <button
                type="submit"
                onClick={handleRegister}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md transition"
            >
                Register
            </button>
            <p className="text-sm text-center">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={onToggle}
                    className="text-indigo-400 hover:underline"
                >
                    Login
                </button>
            </p>
        </form>
    );
};

export default RegisterForm;