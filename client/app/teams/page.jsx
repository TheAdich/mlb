'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerProfileStore from '../utils/playerDetails'
import useAuthStore from '../utils/authUser';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router';
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
    const searchParams = useSearchParams()
    const { user } = useAuthStore();
    //const router = useRouter();
    //console.log(user);
    const { players } = PlayerProfileStore();
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedPlayers, setSelectedPlayers] = useState({});
    const [searchQueries, setSearchQueries] = useState({});
    const [openDropdown, setOpenDropdown] = useState(null);
    const [error, setError] = useState('');
    const teamA = searchParams.get('teamA');
    const teamB = searchParams.get('teamB');
    const date = searchParams.get('date');
    const pk = searchParams.get('pk');
    const [disabled, setisDisabled] = useState(false);

    useEffect(() => {
        if (user) {
            //console.log(user);
            const check = async () => {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/checkteam?matchId=${pk}&userId=${user.userId}`);
                if (res.data.check === 1) {
                    window.location.href = (`/leaderboard?matchId=${pk}`);
                }
            }
            check();
        }
        
        

    }, [user])

    // Add event listener to close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside any dropdown
            if (!event.target.closest('.dropdown-container')) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTeamSelection = (team) => {
        setSelectedTeam(team);
        setSelectedPlayers({});
        setSearchQueries({});
        setError('');
    };

    const handlePlayerChange = (position, playerId) => {
        setSelectedPlayers(prev => ({
            ...prev,
            [position]: players.find(player => player.PlayerID === playerId)
        }));
        setOpenDropdown(null);
        setError('');
    };

    const handleSearch = (position, query) => {
        setSearchQueries(prev => ({
            ...prev,
            [position]: query.toLowerCase()
        }));
    };

    const toggleDropdown = (position) => {
        // If the dropdown is already open for this position, close it
        // Otherwise, open this specific dropdown
        setOpenDropdown(prevOpen =>
            prevOpen === position ? null : position
        );
    };

    const getFilteredPlayers = (position) => {
        const query = searchQueries[position] || '';
        return players.filter(player =>
            player.Name.toLowerCase().includes(query)
        );
    };

    const validateTeam = () => {
        const missingPositions = positions.filter(
            position => !selectedPlayers[position.name]
        );

        if (!selectedTeam) {
            setError('Please select a team');
            return false;
        }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (validateTeam()) {
            console.log('Selected Team:', selectedTeam);
            console.log('Selected players:', selectedPlayers);
        }
        const username = user.username;
        const team = { ...selectedPlayers, ...selectedTeam };
        const matchId = Number(pk);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/createteam`, { username, team, matchId });
            if (res.status === 200) {
                window.location.href = (`/leaderboard?matchId=${pk}`);
                setisDisabled(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const renderPositionDropdown = (position) => (
        <div key={position.id} className="relative dropdown-container">
            <label className="block text-sm font-medium mb-1 text-gray-600">
                {position.fullName} ({position.name})
            </label>
            <div className="relative">
                <button
                    type="button"
                    className={`w-full px-4 py-2 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600 ${error && !selectedPlayers[position.name] ? 'border-red-500' : 'border-gray-300'}`}
                    onClick={() => toggleDropdown(position.name)}
                    disabled={!selectedTeam}
                >
                    {selectedPlayers[position.name]?.Name || `Select ${position.fullName}...`}
                </button>

                {openDropdown === position.name && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                        <div className="p-2">
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
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
                                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 text-gray-600 ${Object.values(selectedPlayers).some(p => p?.PlayerID === player.PlayerID)
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
    );

    const firstColumnPositions = positions.slice(0, 5);
    const secondColumnPositions = positions.slice(5);

    return (
        <div className="flex flex-col md:flex-row w-full gap-4 p-4">
            <div className="w-full md:w-1/2">
                <img
                    src="/baseballField.jpeg"
                    alt="Baseball field"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                />
            </div>

            <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-4">
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Select Team</h2>
                    <div className="flex space-x-4 mb-4">
                        {teamA && (
                            <button
                                className={`px-4 py-2 rounded-lg text-gray-600 ${selectedTeam === teamA ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                onClick={() => handleTeamSelection(teamA)}
                            >
                                {teamA}
                            </button>
                        )}
                        {teamB && (
                            <button
                                className={`px-4 py-2 rounded-lg text-gray-600 ${selectedTeam === teamB ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                onClick={() => handleTeamSelection(teamB)}
                            >
                                {teamB}
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex w-full gap-4">
                    <div className="w-1/2 space-y-4">
                        {firstColumnPositions.map(renderPositionDropdown)}
                    </div>

                    <div className="w-1/2 space-y-4">
                        {secondColumnPositions.map(renderPositionDropdown)}
                    </div>
                </div>

                {error && (
                    <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg mt-4">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className={`w-full mt-4  py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    onClick={handleSubmit}
                    disabled={(!selectedTeam) || disabled}
                >
                    {((!selectedTeam) || disabled) ? 'Save Team' : ''}
                </button>
            </div>
        </div>
    );
};

export default MakeTeam;