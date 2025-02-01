'use client'
import React, { useState } from 'react';
const SearchPlayers = () => {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <div className='w-full h-[100vh] bg-white py-8'>
            <input className='w-1/2 mx-auto block px-2 py-2 outline-none text-black border border-solid border-neutral-500 rounded-md' placeholder='Search via names' type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
    )
}

export default SearchPlayers;