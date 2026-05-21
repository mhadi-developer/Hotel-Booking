import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const RoomSelection = () => {
  return (
    <section className="rooms spad">
      <div className="container">
        <div className="row">

          {/* Room 1 Images */}
          <div className="col-lg-6 p-0 order-lg-2 order-md-2 col-md-6">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              loop={true}
              className="room__pic__slider"
            >
              {[
                "/assets/img/rooms/room-1.jpg",
                "/assets/img/rooms/room-2.jpg",
                "/assets/img/rooms/room-3.jpg",
                "/assets/img/rooms/room-4.jpg",
              ].map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="room__pic__item"
                    style={{
                      backgroundImage: `url(${img})`,
                      height: "500px",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Room 1 Text */}
          <div className="col-lg-6 p-0 order-lg-1 order-md-1 col-md-6">
            <div className="room__text">
              <h3>Premium King Room</h3>

              <h2>
                <sup>$</sup>99<span>/day</span>
              </h2>

              <ul>
                <li>
                  <span>Size:</span>30 ft
                </li>

                <li>
                  <span>Capacity:</span>Max person 3
                </li>

                <li>
                  <span>Bed:</span>King Beds
                </li>

                <li>
                  <span>Services:</span>Wifi, Television, Bathroom,...
                </li>

                <li>
                  <span>View:</span>Sea View
                </li>
              </ul>

              <a href="/">View Details</a>
            </div>
          </div>

          {/* Room 2 Images */}
          <div className="col-lg-6 p-0 order-lg-3 order-md-3 col-md-6">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              loop={true}
              className="room__pic__slider"
            >
              {[
                "/assets/img/rooms/room-2.jpg",
                "/assets/img/rooms/room-3.jpg",
                "/assets/img/rooms/room-4.jpg",
                "/assets/img/rooms/room-1.jpg",
              ].map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="room__pic__item"
                    style={{
                      backgroundImage: `url(${img})`,
                      height: "500px",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Room 2 Text */}
          <div className="col-lg-6 p-0 order-lg-4 order-md-4 col-md-6">
            <div className="room__text right__text">
              <h3>Deluxe Room</h3>

              <h2>
                <sup>$</sup>86<span>/day</span>
              </h2>

              <ul>
                <li>
                  <span>Size:</span>30 ft
                </li>

                <li>
                  <span>Capacity:</span>Max person 3
                </li>

                <li>
                  <span>Bed:</span>King Beds
                </li>

                <li>
                  <span>Services:</span>Wifi, Television, Bathroom,...
                </li>

                <li>
                  <span>View:</span>Sea View
                </li>
              </ul>

              <a href="/">View Details</a>
            </div>
          </div>

          {/* Room 3 Images */}
          <div className="col-lg-6 p-0 order-lg-6 order-md-6 col-md-6">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              loop={true}
              className="room__pic__slider"
            >
              {[
                "/assets/img/rooms/room-3.jpg",
                "/assets/img/rooms/room-4.jpg",
                "/assets/img/rooms/room-2.jpg",
                "/assets/img/rooms/room-1.jpg",
              ].map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="room__pic__item"
                    style={{
                      backgroundImage: `url(${img})`,
                      height: "500px",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Room 3 Text */}
          <div className="col-lg-6 p-0 order-lg-5 order-md-5 col-md-6">
            <div className="room__text">
              <h3>Double Room</h3>

              <h2>
                <sup>$</sup>71<span>/day</span>
              </h2>

              <ul>
                <li>
                  <span>Size:</span>30 ft
                </li>

                <li>
                  <span>Capacity:</span>Max person 3
                </li>

                <li>
                  <span>Bed:</span>King Beds
                </li>

                <li>
                  <span>Services:</span>Wifi, Television, Bathroom,...
                </li>

                <li>
                  <span>View:</span>Sea View
                </li>
              </ul>

              <a href="/">View Details</a>
            </div>
          </div>

          {/* Room 4 Images */}
          <div className="col-lg-6 p-0 order-lg-7 order-md-7 col-md-6">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              loop={true}
              className="room__pic__slider"
            >
              {[
                "/assets/img/rooms/room-4.jpg",
                "/assets/img/rooms/room-1.jpg",
                "/assets/img/rooms/room-2.jpg",
                "/assets/img/rooms/room-3.jpg",
              ].map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="room__pic__item"
                    style={{
                      backgroundImage: `url(${img})`,
                      height: "500px",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Room 4 Text */}
          <div className="col-lg-6 p-0 order-lg-8 order-md-8 col-md-6">
            <div className="room__text right__text">
              <h3>Luxury Room</h3>

              <h2>
                <sup>$</sup>79<span>/day</span>
              </h2>

              <ul>
                <li>
                  <span>Size:</span>30 ft
                </li>

                <li>
                  <span>Capacity:</span>Max person 3
                </li>

                <li>
                  <span>Bed:</span>King Beds
                </li>

                <li>
                  <span>Services:</span>Wifi, Television, Bathroom,...
                </li>

                <li>
                  <span>View:</span>Sea View
                </li>
              </ul>

              <a href="/">View Details</a>
            </div>
          </div>
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