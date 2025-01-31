'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/loginForm';
import RegisterForm from '../components/registerForm';

const  AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          {isRegister ? 'Register' : 'Login'}
        </h1>

        {isRegister ? (
          <RegisterForm onToggle={() => setIsRegister(false)} />
        ) : (
          <LoginForm onToggle={() => setIsRegister(true)} />
        )}
      </motion.div>
    </div>
  );
}

export default AuthPage;