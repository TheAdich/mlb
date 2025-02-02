'use client'
import React, { useState, useEffect } from 'react';
import Papa from "papaparse";
import PlayerProfileStore from '../utils/playerDetails'
import Loading from '../components/loading/loading';
const SearchPlayers = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { players, setPlayers } = PlayerProfileStore();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        try {
            setLoading(true);
            fetch('/players.csv')
                .then((response) => response.text())
                .then((csvText) => {
                    Papa.parse(csvText, {
                        header: true,
                        skipEmptyLines: true,
                        dynamicTyping: true,
                        complete: (results) => {
                            console.log("Parsed CSV Data:", results.data);
                            setPlayers(results.data);
                        }
                    })
                })
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [])
    const showPlayerDetails = (index) => {
        console.log(players[index]);
    }

    return (
        <div className='w-full h-[100vh] bg-white py-8'>
            <input className='w-1/2 mx-auto block px-2 py-2 outline-none text-black border border-solid border-neutral-500 rounded-md' placeholder='Search via names' type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div className='bg-inherit mt-10 flex flex-wrap w-full gap-4'>
                {loading ? <Loading /> : searchQuery ?
                    players.filter((player) => player.Name.toLowerCase().includes(searchQuery.toLowerCase())).map((player, index) => (
                        <div
                            key={index}
                            onClick={()=>showPlayerDetails(index)}
                            className="w-3/12 mx-auto bg-neutral-100 p-4 my-2 rounded-md 
             transition-all duration-300 hover:shadow-lg hover:scale-105"
                        >
                            <p className="text-neutral-800 text-lg font-bold">{player.Name}</p>
                            <div className="flex gap-4">
                                <p className="text-neutral-700 text-md">{player.Country}</p>
                                <p className="text-neutral-700 text-md">{player.Age}</p>
                            </div>
                            <p className="text-neutral-700 text-md">{player.Position}</p>
                        </div>

                    ))
                    : <p className='text-gray-700 mx-auto text-center mt-10'>No Players Found</p>}
            </div>
        </div>
    )
}

export default SearchPlayers;