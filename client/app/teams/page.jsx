'use client'
import React, { useState } from 'react';
import PlayerProfileStore from '../utils/playerDetails'

const positions = [
    { id: 1, name: 'P', fullName: 'Pitcher' },
    { id: 2, name: 'C', fullName: 'Catcher' },
    { id: 3, name: '1B', fullName: 'First Base' },
    { id: 4, name: '2B', fullName: 'Second Base' },
    { id: 5, name: '3B', fullName: 'Third Base' },
    { id: 6, name: 'SS', fullName: 'Shortstop' },
    { id: 7, name: 'LF', fullName: 'Left Field' },
    { id: 8, name: 'CF', fullName: 'Center Field' },
    { id: 9, name: 'RF', fullName: 'Right Field' },
];

const MakeTeam = () => {
    const { players } = PlayerProfileStore();
    const [selectedPlayers, setSelectedPlayers] = useState({});
    const [searchQueries, setSearchQueries] = useState({});
    const [openDropdown, setOpenDropdown] = useState(null);
    const [error, setError] = useState('');

    const handlePlayerChange = (position, playerId) => {
        setSelectedPlayers(prev => ({
            ...prev,
            [position]: players.find(player => player.PlayerID === playerId)
        }));
        setOpenDropdown(null);
        setError(''); // Clear error when selection changes
    };

    const handleSearch = (position, query) => {
        setSearchQueries(prev => ({
            ...prev,
            [position]: query.toLowerCase()
        }));
    };

    const getFilteredPlayers = (position) => {
        const query = searchQueries[position] || '';
        return players.filter(player =>
            player.Name.toLowerCase().includes(query)
        );
    };

    const validateTeam = () => {
        // Check if all positions are filled
        const missingPositions = positions.filter(
            position => !selectedPlayers[position.name]
        );

        if (missingPositions.length > 0) {
            setError(`Please select players for: ${missingPositions.map(p => p.fullName).join(', ')}`);
            return false;
        }

        
        const selectedPlayerIds = Object.values(selectedPlayers).map(player => player.PlayerID);
        const uniquePlayerIds = new Set(selectedPlayerIds);
        
        if (selectedPlayerIds.length !== uniquePlayerIds.size) {
            setError('Duplicate players selected. Each player can only be selected once.');
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (validateTeam()) {
            console.log('Selected players:', selectedPlayers);
            // Add your save team logic here
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-full gap-4 p-4">
            <div className="w-full md:w-3/4">
                <img
                    src="/baseballField.jpg"
                    alt="Baseball field"
                    className="w-full h-auto rounded-lg shadow-lg"
                />
            </div>

            <div className="w-full md:w-1/4 bg-white rounded-lg shadow-lg p-4 text-gray-500">
                <h2 className="text-xl font-bold mb-4">Select Players</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form className="space-y-4">
                    {positions.map((position) => (
                        <div key={position.id} className="relative">
                            <label className="block text-sm font-medium mb-1">
                                {position.fullName} ({position.name})
                            </label>

                            <div className="relative">
                                <button
                                    type="button"
                                    className={`w-full px-4 py-2 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                                        error && !selectedPlayers[position.name] ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    onClick={() => setOpenDropdown(openDropdown === position.name ? null : position.name)}
                                >
                                    {selectedPlayers[position.name]?.Name || `Select ${position.fullName}...`}
                                </button>

                                {openDropdown === position.name && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                                        <div className="p-2">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Search players..."
                                                onChange={(e) => handleSearch(position.name, e.target.value)}
                                                value={searchQueries[position.name] || ''}
                                            />
                                        </div>

                                        <div className="max-h-48 overflow-y-auto">
                                            {getFilteredPlayers(position.name).map((player) => (
                                                <button
                                                    key={player.PlayerID}
                                                    type="button"
                                                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
                                                        Object.values(selectedPlayers).some(p => p?.PlayerID === player.PlayerID)
                                                            ? 'bg-gray-100 text-gray-400'
                                                            : ''
                                                    }`}
                                                    onClick={() => handlePlayerChange(position.name, player.PlayerID)}
                                                    disabled={Object.values(selectedPlayers).some(p => p?.PlayerID === player.PlayerID)}
                                                >
                                                    {player.Name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={handleSubmit}
                    >
                        Save Team
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MakeTeam;