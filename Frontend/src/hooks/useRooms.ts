
import { useEffect } from "react";
import { useRoomStore } from "../store/roomsStore";

export const useRooms = () => {
    const fetchedRooms = useRoomStore(
        (state) => state.fetchedRooms
    );

    const loading = useRoomStore(
        (state) => state.loading
    );
    const error = useRoomStore(
        (state)=>state.error
    )

    const getFetchedRooms = useRoomStore((state) => state.getFetchedRooms);
    useEffect(() => {
      getFetchedRooms()  
    },[getFetchedRooms])

    return {
        fetchedRooms,
        loading,
        error
    }

    
}