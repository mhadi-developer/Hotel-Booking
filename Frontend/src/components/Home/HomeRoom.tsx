import React, { useEffect, useState } from "react";
import axiosInstance from "../../resources/axios.Instance.create";
import type { room } from "../../types/schema/room";
import { Link } from "react-router-dom";

const HomeRoom = () => {
  const [latestRooms, setLatestRooms] = useState<room[]>([]);
  useEffect(() => {
    const fetchedLatestRoom = async () => {
      const response = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/get/rooms/latest`);
      if (response.status === 200 || response?.data) {
        setLatestRooms(response?.data?.fetchedLatestRooms);
      }
    }
    fetchedLatestRoom();
   },[])


  return (
    <section className="home-room spad py-5 my-3">

      <div className="container">
        <div className="row">

          <div className="col-lg-12">
            <div className="section-title">
              <h5>OUR ROOM</h5>
              <h2>Explore Our Hotel</h2>
            </div>
          </div>

        </div>
      </div>

      <div className="container-fluid">
        <div className="row">

          {
  latestRooms.length > 0 ? (

    latestRooms.map((room) => (

      <div
        className="col-lg-3 col-md-6 col-sm-6 p-0"
        key={room.id}
      >

        <div
          className="home__room__item"
          style={{
            backgroundImage: `url(${room?.images?.[0]?.secure_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "500px",
          }}
        >

          <div className="home__room__title">

            <h4>{room?.name}</h4>

            <h2>
              <sup>$</sup>
              {room?.price}
              <span>/day</span>
            </h2>

          </div>

          <Link to={`/room/details/${room?.id}`}>View Details</Link>

        </div>

      </div>
    ))

  ) : (

    <div className="col-md-12 text-center text-muted">
      <p>No Latest Rooms</p>
    </div>

  )
}
         

        </div>
      </div>

      <div className="container">
        <div className="home__explore">
          <div className="row">

            <div className="col-lg-9 col-md-8">
              <h3>
                Planning your next trip? Save up to 25% on your hotel
              </h3>
            </div>

            <div className="col-lg-3 col-md-4 text-center">
              <a href="#" className="primary-btn">
                Explorer More
              </a>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default HomeRoom;