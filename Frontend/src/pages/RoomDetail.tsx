import React from 'react'
import OffCanvas from '../components/Home/OffCanvas'
import Header from '../components/Home/Header'
import RoomDetailsSlider from '../components/RoomDetail/RoomDetailSlider'
import RoomDescription from '../components/RoomDetail/RoomDescription'

const RoomDetail = () => {
  return (
      <div>
           <OffCanvas />
          <Header />
          <RoomDetailsSlider />
          <RoomDescription/>
    </div>
  )
}

export default RoomDetail