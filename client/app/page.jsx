'use client'
import React, { useState } from 'react';
import { Menu, X, Trophy, Users, DollarSign, Baseline as Baseball, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useAuthStore from './utils/authUser';
function App() {
  const {user,logout} = useAuthStore();
  
  const router = useRouter();
 
  //console.log(user);

  const handleAuth = () => {
    router.push('/auth')
  };

  const handleLogOut = () => {
    logout();
  }

  return (
    <div className="min-h-screen bg-gray-50">

      

      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/70">
          <img
            src="https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80"
            alt="Baseball Stadium"
            className="w-full h-full object-cover mix-blend-overlay opacity-80"
          />
        </div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-2xl text-white">

            <h1 className="text-5xl font-bold mb-6">
              Welcome {user ? user.username : 'Anonymous'}
            </h1>
            <h1 className="text-5xl font-bold mb-6">
              Play Fantasy Baseball Like Never Before
            </h1>
            <p className="text-xl mb-8">
              Create your dream team, join contests, and win big with SmartBase -
              the ultimate fantasy baseball experience.
            </p>
            {!user && <button
              onClick={() => handleAuth()}
              className="bg-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 flex items-center"
            >
              Start Playing Now <ChevronRight className="ml-2" />
            </button>
            }
          </div>
        </div>
      </section>


      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-gray-500 font-bold text-center mb-12">Why Choose SmartBase?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-500 mb-2">Win Big Prizes</h3>
              <p className="text-gray-600">Compete in daily contests and win exciting cash prizes</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-500 font-semibold mb-2">Millions of Players</h3>
              <p className="text-gray-600">Join the largest fantasy baseball community</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-500 font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Fast and secure deposits and withdrawals</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

export default App;