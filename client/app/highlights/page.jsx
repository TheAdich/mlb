'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/loading/loading';

const HighLights = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getVideos = async () => {
            try {
                const urls = [
                    'https://statsapi.mlb.com/api/v1/game/748266/content?hydrate=game(content(highlights(all)))',
                    'https://statsapi.mlb.com/api/v1/game/748344/content?hydrate=game(content(highlights(all)))'
                ];

                const responses = await Promise.all(urls.map(url => axios.get(url)));

                const combinedData = responses
                    .map(res => res.data.highlights.highlights.items)
                    .flat(); 

                console.log(combinedData);
                setData(combinedData);
            } catch (err) {
                console.log(err);
            }
        };
        getVideos();
    }, []);
    return (
        loading ? <Loading /> :
        <div className='w-full py-8 px-8 min-h-screen bg-white'>
            <h1 className='text-center text-2xl text-gray-500 font-bold'>Highlights</h1>
            <div className='flex w-full min-h-screen flex-wrap items-center mt-8 justify-evenly'>
                {data && data.map((item, index) => (
                    <div key={index} className='w-1/2 p-2'>
                        <video
                            src={item.playbacks[0].url}
                            controls
                            className='w-full h-auto object-cover rounded-lg shadow-lg'
                        />
                    </div>
                ))}

            </div>
        </div>
    )
}
export default HighLights