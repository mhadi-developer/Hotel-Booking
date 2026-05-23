import React, { useEffect, useState } from 'react'
import OffCanvas from '../components/Home/OffCanvas'
import Header from '../components/Home/Header'
import RoomDetailsSlider from '../components/RoomDetail/RoomDetailSlider'
import RoomDescription from '../components/RoomDetail/RoomDescription'
import { useParams } from 'react-router'
import axiosInstance from '../resources/axios.Instance.create'
import type { room } from '../types/schema/room'

const RoomDetail = () => {

  const [roomDetails, setRoomDetails] = useState<room | undefined>();


  const { id } = useParams();
  useEffect(() => {
    
    const fetchRoomById = async () => {
        try {
          const response = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/get/room/details/${id}`);
          console.log(response);
          setRoomDetails(response?.data?.fetchedRoomById);
          
        } catch (error) {
          console.log(error);
          
        }
       
    }
    
    fetchRoomById();
     
  }, [id]);

  return (
      <div>
           <OffCanvas />
          <Header />
      <RoomDetailsSlider roomDetails={ roomDetails} />
      <RoomDescription roomDetails={roomDetails } />
    </div>
  )
}

export default RoomDetail