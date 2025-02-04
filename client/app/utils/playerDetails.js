import { create } from "zustand";
import { persist } from "zustand/middleware";

const PlayerProfileStore=create(
    persist(
        (set)=>(
            {
                players:[],
                setPlayers:(newPlayers)=>set({players:newPlayers}),
            }
        ),
        {
            name:'player-profile-storage',
            getStorage:()=>sessionStorage,
        }
    )
)
export default PlayerProfileStore;