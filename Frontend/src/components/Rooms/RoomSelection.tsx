import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import {  useMemo } from "react";


import { Link } from "react-router";
import { useRooms } from "../../hooks/useRooms";

const RoomSelection = () => {
  const {fetchedRooms} = useRooms()

  
  // MEMOIZED ROOM JSX
  const renderedRooms = useMemo(() => {
    return fetchedRooms?.map((room, index) => (
      <div className="row"  key={room.id}>


        
        {/* IMAGE SECTION */}
        <div className={`col-lg-6 p-0  col-md-6 ${
         index % 2 ===0 ?  "order-lg-2 order-md-2" : "order-lg-1 order-md-1"
        }`}>
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            loop={true}
            className="room__pic__slider"
          >
            {room?.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  className="room__pic__item"
                  style={{
                    backgroundImage: `url(${img?.secure_url})`,
                    height: "500px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* TEXT SECTION */}
        <div className={`col-lg-6 p-0  col-md-6 ${
           index % 2 === 0 ? "order-lg-1 order-md-1" : "  order-lg-2 order-md-2"
          }`}
          style={{
          marginBlock:"10px"
        }}>
          <div className="room__text">
            <h3>{room?.name}</h3>

            <h2>
              <sup>$</sup>
              {room?.price}
              <span>/day</span>
            </h2>

            <ul>
              <li>
                <span>Size:</span>
                30 ft
              </li>

              <li>
                <span>Capacity:</span>
                Max person 3
              </li>

              <li>
                <span>Bed:</span>
                King Beds
              </li>

              <li>
                <span>Services:</span>
                Wifi, Television, Bathroom
              </li>

              <li>
                <span>View:</span>
                Sea View
              </li>
            </ul>

            <Link to={`/room/details/${room?.id}`}>
              View Details
            </Link>
          </div>
        </div>
      </div>
    ));
  }, [fetchedRooms]);

  return (
    <section className="fetchedRooms spad">
      <div className="container">
        <div className="row">

          {renderedRooms}

        </div>

        {/* Pagination */}
        <div className="row">
          <div className="col-lg-12">
            <div className="pagination__number">
              <a href="/">1</a>
              <a href="/">2</a>

              <a href="/">
                Next <span className="arrow_right"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomSelection;