'use client'
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import userStore from '../utils/authUser';
const LoginForm = ({ onToggle }) => {
    const {login}=userStore();
    const router=useRouter();
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleLogin = async (e) => {
        if(!formData.username || !formData.password){
            alert('Please fill all the fields');
            return;
        }
        //console.log(formData);
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, formData);
            if (res.status !== 200) {
                throw new Error('Login failed');
            }
            else{
                const user={
                    username:res.data.username,
                    email:res.data.email
                }
                login(user);
                router.push('/');
            }

        } catch (err) {
            console.error(err);
        }
    }
    return (
        <form className="space-y-4">
            <input
                type="text"
                required={true}
                name="username"
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-3 rounded-md bg-gray-700 focus:outline-none focus:ring focus:ring-indigo-500"
            />
            <input
                type="password"
                required={true}
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
}
export default LoginForm;