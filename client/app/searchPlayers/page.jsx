'use client'
import React, { useState, useEffect } from 'react';
import Papa from "papaparse";
import PlayerProfileStore from '../utils/playerDetails'
import Loading from '../components/loading/loading';

const DetailRow = ({ label, value }) => (
    <div className="flex flex-col space-y-1">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );

const ShowPlayerDetails = ({ selectedPlayer, setShowPopup }) => {
    if (!selectedPlayer) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-40">

            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={() => setShowPopup(false)}
            />


            <div className="relative w-full max-w-2xl mx-4 md:mx-auto bg-white rounded-lg shadow-xl z-50 animate-fade-in">
                <div className="p-6 space-y-4">

                    <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">
                        Player Details
                    </h2>


                    <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DetailRow label="Name" value={selectedPlayer.Name} />
                            <DetailRow label="Age" value={selectedPlayer.Age} />
                            <DetailRow label="Country" value={selectedPlayer.Country} />
                            <DetailRow label="Position" value={selectedPlayer.Position} />
                            <DetailRow label="BoxScore" value={selectedPlayer['Boxscore Name']} />
                            <DetailRow label="Strike Zone Bottom" value={selectedPlayer['Strike Zone Bottom']} />
                            <DetailRow label="Strike Zone Top" value={selectedPlayer['Strike Zone Top']} />
                            <DetailRow label="Throw Side" value={selectedPlayer['Throw Side']} />
                            <DetailRow label="Bat Side" value={selectedPlayer['Bat Side']} />
                        </div>
                    </div>


                    <div className="pt-6 border-t">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="w-full px-4 py-2.5 text-sm font-medium text-white bg-cyan-600 
                         hover:bg-cyan-700 transition-colors duration-200 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


const SearchPlayers = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { players, setPlayers } = PlayerProfileStore();
    const [loading, setLoading] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState();
    const [showPopup, setShowPopup] = useState();

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
        setSelectedPlayer(players[index])
        setShowPopup(true);
    }



    return (
        <div className='w-full h-[100vh] bg-white py-8'>
            {showPopup && <ShowPlayerDetails selectedPlayer={selectedPlayer} setShowPopup={setShowPopup} />}
            <input className='w-1/2 mx-auto block px-2 py-2 outline-none text-black border border-solid border-neutral-500 rounded-md' placeholder='Search via names' type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div className='bg-inherit mt-10 flex flex-wrap w-full gap-4'>
                {loading ? <Loading /> : searchQuery ?
                    players.filter((player) => player.Name.toLowerCase().includes(searchQuery.toLowerCase())).map((player, index) => (
                        <div
                            key={index}
                            onClick={() => showPlayerDetails(index)}
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