'use client'
import React, { useState } from "react";
import Image from "next/image";
const MakeTeam = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="w-full h-[100dvh] py-8 bg-white flex">
            <img
                src="/baseballField.jpg"
                alt="Baseball field"
                className="sm:w-1/4 sm:h-1/4 md:w-1/2 md:h-3/4"
            />
            
        </div>
    )
}
export default MakeTeam;