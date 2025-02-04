'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/loading/loading";
import { useRouter } from "next/navigation";
import  useAuthStore  from "../utils/authUser";
const UpcomingMatches = () => {
    const router=useRouter();
    const { user } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const getMatches = async () => {
            try {
                setLoading(true);
                const res = await axios.get('https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=2025-02-20&endDate=2025-02-28');
                setMatches(res.data.dates);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        getMatches();
    }, [])

    return (
        <div className="bg-white px-4 py-8 text-white min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8 uppercase tracking-wider">Upcoming Matches</h1>

            {loading ? (
                <Loading />
            ) : (
                <div className="space-y-6">
                    {matches.map((match) => {
                        const date = match.date;
                        return (
                            <React.Fragment key={date}>
                                {match.games.map((game, index) => (
                                    <div
                                        key={index}
                                        className="w-full max-w-4xl mx-auto flex flex-col items-center justify-between 
                               bg-blue-700 rounded-xl shadow-lg p-6 
                               transform transition-all duration-300 
                               hover:scale-105 hover:shadow-2xl"
                                    >
                                        <div className="flex w-full items-center justify-between">

                                            <div className="flex w-1/3 items-center space-x-4 mb-4 md:mb-0">
                                                <div className="bg-white/20 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                                                    <span className="text-white font-bold text-2xl">
                                                        {game.teams.away.team.name.slice(0, 2).toUpperCase()}
                                                    </span>
                                                </div>
                                                <span className="text-xl font-semibold">
                                                    {game.teams.away.team.name}
                                                </span>
                                            </div>


                                            <div className="text-center w-1/3 mb-4 md:mb-0">
                                                <p className="text-sm opacity-75 mb-2">{date}</p>
                                                <p className="text-2xl font-bold text-white/80">VS</p>
                                            </div>


                                            <div className="flex w-1/3 items-center space-x-4">
                                                <div className="bg-white/20 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                                                    <span className="text-white font-bold text-2xl">
                                                        {game.teams.home.team.name.slice(0, 2).toUpperCase()}
                                                    </span>
                                                </div>
                                                <span className="text-xl font-semibold">
                                                    {game.teams.home.team.name}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex mt-10">
                                            <button onClick={()=>user ? window.location.href=(`/teams?teamA=${game.teams.away.team.name}&teamB=${game.teams.home.team.name}&date=${date}&pk=${game.gamePk}`):router.push('/auth')} className="hover:bg-blue-700 hover:text-white bg-white text-blue-700 px-2 py-2 rounded-md mx-4 transition-all ease-in-out duration-500">Make Your Team</button>
                                            <button  onClick={()=>user ? window.location.href=(`/leaderboard?matchId=${game.gamePk}`):router.push('/')} className="hover:bg-blue-700 hover:text-white  bg-white text-blue-700 px-2 py-2 rounded-md mx-4 duration-500">View LeaderBoard</button>
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default UpcomingMatches;