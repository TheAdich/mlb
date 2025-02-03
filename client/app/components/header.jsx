'use client'
import React, { useState } from 'react';
import userStore from '../utils/authUser';
import { Menu, X, Trophy, Users, DollarSign, Baseline as Baseball, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
const Header = () => {
    const { user,logout } = userStore();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleAuth = () => {
        router.push('/auth')
    };

    const handleLogOut = () => {
        logout();
    }


    return (
        <header className="bg-blue-900 text-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2 cursor-pointer " onClick={()=>router.push('/')}>
                        <Baseball className="h-8 w-8" />
                        <span className="text-2xl font-bold">MLBFantasy</span>
                    </div>


                    <nav className="hidden md:flex items-center space-x-8">
                        
                       
                        <a href="/searchPlayers" className="hover:text-blue-300">Search Players</a>
                        <a href='/upcomingMatches' className="hover:text-blue-300 cursor-pointer">Upcoming Matches</a>
                        {!user ?
                            <button
                                onClick={() => handleAuth()}
                                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Sign In
                            </button>
                            : <button
                                onClick={() => handleLogOut()}
                                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Log Out
                            </button>}

                    </nav>


                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>


            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 flex flex-col pb-3 space-y-1">
                       
                        
                        <a href="/searchPlayers" className="hover:text-blue-300 px-3 py-2">Search Players</a>
                        <a href='/upcomingMatches' className="hover:text-blue-300  px-3 py-2cursor-pointer">Upcoming Matches</a>
                        {!user ?
                            <button
                                onClick={() => handleAuth()}
                                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Sign In
                            </button>
                            : <button
                                onClick={() => handleLogOut()}
                                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Log Out
                            </button>}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
