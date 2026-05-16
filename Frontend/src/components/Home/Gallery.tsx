import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const Gallery = () => {
  return (
    <section className="gallery spad my-5 py-5">

      {/* TEXT SECTION */}
      <div className="gallery__text">
        <div className="container">
          <div className="row">

            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="section-title">
                <h5>OUR GALLERY</h5>
                <h2>Explore The Most Beautiful In The Hotel</h2>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="gallery__title">
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Sunt in culpa qui officia deserunt mollit anim.
                </p>

                <a href="#" className="primary-btn">
                  View Gallery <span className="arrow_right"></span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SWIPER SLIDER */}
      <div className="gallery__slider">

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={15}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >

          <SwiperSlide>
            <div
              className="gallery__item small__item set-bg"
              data-setbg="/assets/img/gallery/gallery-1.jpg"
            ></div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="gallery__item set-bg"
              data-setbg="/assets/img/gallery/gallery-2.jpg"
            ></div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="gallery__item set-bg"
              data-setbg="/assets/img/gallery/gallery-3.jpg"
            ></div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="gallery__item set-bg"
              data-setbg="/assets/img/gallery/gallery-4.jpg"
            ></div>
          </SwiperSlide>

        </Swiper>

      </div>

    </section>
  );
};

export default Gallery;