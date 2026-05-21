import React from 'react'
import Header from '../components/Home/Header'
import OffCanvas from '../components/Home/OffCanvas'
import Breadcrumb from '../components/Rooms/BreadCrumb'
import RoomSelection from '../components/Rooms/RoomSelection'

const Rooms = () => {
  return (
      <div>
          <OffCanvas />
          <Header />
          <Breadcrumb />
          <RoomSelection/>
    </div>
  )
}

export default Rooms