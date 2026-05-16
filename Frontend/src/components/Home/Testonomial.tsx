import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const Testimonial = () => {
  return (
    <section className="testimonial spad">

      <div className="container">
        <div className="row">

          <div className="col-lg-5">
            <div className="testimonial__pic">
              <img src="/assets/img/testimonial-left.jpg" alt="" />
            </div>
          </div>

          <div className="col-lg-7">
            <div className="testimonial__text">

              <div className="section-title">
                <h5>Testimonials</h5>
                <h2>What do customers say about us?</h2>
              </div>

              <div className="testimonial__slider__content">

                <Swiper
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  spaceBetween={30}
                >

                  {/* Slide 1 */}
                  <SwiperSlide>
                    <div className="testimonial__item">
                      <h5>Detailed Review:</h5>

                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                      </div>

                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      </p>

                      <div className="testimonial__author">
                        <div className="row">

                          <div className="col-lg-6 col-md-6">
                            <div className="testimonial__author__title">
                              <h5>Ridchard Houston</h5>
                              <span>Director Colorlib</span>
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="testimonial__author__social">
                              <a href="#"><i className="fa fa-facebook"></i></a>
                              <a href="#"><i className="fa fa-twitter"></i></a>
                              <a href="#"><i className="fa fa-linkedin"></i></a>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Slide 2 */}
                  <SwiperSlide>
                    <div className="testimonial__item">
                      <h5>Detailed Review:</h5>

                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                      </div>

                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      </p>

                      <div className="testimonial__author">
                        <div className="row">

                          <div className="col-lg-6 col-md-6">
                            <div className="testimonial__author__title">
                              <h5>John Smith</h5>
                              <span>Director Colorlib</span>
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="testimonial__author__social">
                              <a href="#"><i className="fa fa-facebook"></i></a>
                              <a href="#"><i className="fa fa-twitter"></i></a>
                              <a href="#"><i className="fa fa-linkedin"></i></a>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Slide 3 */}
                  <SwiperSlide>
                    <div className="testimonial__item">
                      <h5>Detailed Review:</h5>

                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                      </div>

                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      </p>

                      <div className="testimonial__author">
                        <div className="row">

                          <div className="col-lg-6 col-md-6">
                            <div className="testimonial__author__title">
                              <h5>Jack Kelly</h5>
                              <span>Director Colorlib</span>
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="testimonial__author__social">
                              <a href="#"><i className="fa fa-facebook"></i></a>
                              <a href="#"><i className="fa fa-twitter"></i></a>
                              <a href="#"><i className="fa fa-linkedin"></i></a>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                </Swiper>

              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Testimonial;