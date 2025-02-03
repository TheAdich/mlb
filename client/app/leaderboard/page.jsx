'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from 'next/navigation'

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

const Leaderboard = () => {
    const searchParams = useSearchParams()
    const matchId = searchParams.get('matchId')

    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const getLeaderboard = async () => {
            try {
                console.log(matchId);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard?matchId=${matchId}`);
                if (res.data) {
                    const formattedLeaderboard = res.data.map((rawData) => {
                        const team = JSON.parse(rawData.team);
                        let formattedTeam=[];
                        positions.forEach((position) => {
                            if (team[position.name]) {
                                formattedTeam.push({
                                    position: position.name,
                                    player: team[position.name]
                                });
                            }
                        });
                        console.log(team)
                        return {
                            formattedTeam,
                            username: rawData.user.username
                        };
                    });
                    setLeaderboard(formattedLeaderboard);
                }
            } catch (err) {
                console.error(err);
            }
        };

        getLeaderboard();
    }, [matchId]);

    return (
        <div className="w-full min-h-screen mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Leaderboard</h2>
            <div className="w-full overflow-x-auto">
                <div className="flex w-full bg-gray-200 text-gray-700 uppercase text-sm leading-normal p-3">
                    <div className="w-1/6 font-bold">Rank</div>
                    <div className="w-1/3 font-bold">Username</div>
                    <div className="w-1/2 font-bold">Team</div>
                </div>
                {leaderboard && leaderboard.map((entry, index) => (
                    <React.Fragment key={index}>
                        <div className="flex w-full border-b border-gray-300  hover:bg-gray-100 p-3 items-center">
                            <div className="w-1/6 text-gray-500">{index + 1}</div>
                            <div className="w-1/3 font-semibold text-gray-500">{entry.username}</div>
                            <div className="w-1/2 grid grid-cols-2 gap-2">
                                {entry.formattedTeam.map((player, index) => (
                                    <div key={index} className="bg-gray-200 flex p-2 rounded-md text-gray-500">
                                        <p className="pr-2 text-sm font-semibold">{player.position}:</p>
                                        <p className="text-sm">{player.player['Name']}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr></hr>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default Leaderboard;