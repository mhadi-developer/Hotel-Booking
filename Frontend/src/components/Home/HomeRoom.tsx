import React from "react";

const HomeRoom = () => {
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

          <div className="col-lg-3 col-md-6 col-sm-6 p-0">
            <div
              className="home__room__item set-bg"
              data-setbg="/assets/img/home-room/hr-1.jpg"
            >
              <div className="home__room__title">
                <h4>Deluxe Room</h4>
                <h2>
                  <sup>$</sup>55<span>/day</span>
                </h2>
              </div>
              <a href="#">Booking Now</a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6 p-0">
            <div
              className="home__room__item set-bg"
              data-setbg="/assets/img/home-room/hr-2.jpg"
            >
              <div className="home__room__title">
                <h4>Deluxe Room</h4>
                <h2>
                  <sup>$</sup>85<span>/day</span>
                </h2>
              </div>
              <a href="#">Booking Now</a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6 p-0">
            <div
              className="home__room__item set-bg"
              data-setbg="/assets/img/home-room/hr-3.jpg"
            >
              <div className="home__room__title">
                <h4>Deluxe Room</h4>
                <h2>
                  <sup>$</sup>94<span>/day</span>
                </h2>
              </div>
              <a href="#">Booking Now</a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6 p-0">
            <div
              className="home__room__item set-bg"
              data-setbg="/assets/img/home-room/hr-4.jpg"
            >
              <div className="home__room__title">
                <h4>Deluxe Room</h4>
                <h2>
                  <sup>$</sup>71<span>/day</span>
                </h2>
              </div>
              <a href="#">Booking Now</a>
            </div>
          </div>

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