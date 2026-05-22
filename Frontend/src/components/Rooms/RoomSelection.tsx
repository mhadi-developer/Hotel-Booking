import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type {room} from "../../types/schema/room"
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import axiosInstance from "../../resources/axios.Instance.create";

const RoomSelection = () => {
  const [rooms, setRooms] = useState<room[]>([]);

  

  
  
  useEffect(() => {
    try {
      const fetchedRooms = async () => {
        const response = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/get/rooms`,
        );
        setRooms(response?.data?.fetchedRooms);
      }
    
      fetchedRooms();
      
      
    }
    catch (error) {
      console.log(error);
    }
  }, []);

  console.log({ rooms });
 

  


  
 

  return (
    <section className="rooms spad">
      <div className="container">
        <div className="row">

          {/* Room 1 Images */}


          {
  rooms?.map((room) => (

    <div
      className="row"
      key={room.id}
    >

      {/* IMAGE SECTION */}
      <div className="col-lg-6 p-0 order-lg-2 order-md-2 col-md-6">

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop={true}
          className="room__pic__slider"
        >

          {
            room?.images?.map((img, index) => (

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

            ))
          }

        </Swiper>

      </div>

      {/* TEXT SECTION */}
      <div className="col-lg-6 p-0 order-lg-1 order-md-1 col-md-6">

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

          <a href="/">View Details</a>

        </div>

      </div>

    </div>

  ))
}

          {/* Room 1 Text */}
          
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