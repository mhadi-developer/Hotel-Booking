const RoomDescription = () => {
  return (
    <section className="room-details spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="room__details__content">

              {/* Rating Section */}
              <div className="room__details__rating">

                <div className="room__details__hotel">
                  <span>Hotel</span>

                  <div className="room__details__hotel__rating">
                    <span className="icon_star"></span>
                    <span className="icon_star"></span>
                    <span className="icon_star"></span>
                    <span className="icon_star"></span>
                    <span className="icon_star-half_alt"></span>
                  </div>
                </div>

                <div className="room__details__advisor">
                  <img
                    src="/assets/img/rooms/details/tripadvisor.png"
                    alt="tripadvisor"
                  />

                  <div className="room__details__advisor__rating">
                    <span className="icon_star"></span>
                    <span className="icon_star"></span>
                    <span className="icon_star"></span>
                    <span className="icon_star"></span>
                    <span className="icon_star-half_alt"></span>
                  </div>

                  <span className="review">(1000 Reviews)</span>
                </div>
              </div>

              {/* Title */}
              <div className="room__details__title">
                <h2>Premium King Room</h2>

                <a href="/" className="primary-btn">
                  Booking Now
                </a>
              </div>

              {/* Description */}
              <div className="room__details__desc">
                <h2>Description:</h2>

                <p>
                  We’re halfway through the summer, but while plenty of people
                  are kicking back and enjoying their vacations, the social
                  media development teams likely aren’t doing the same.
                </p>

                <p>
                  The new desktop version of the site is significantly improved,
                  which will make it easier for hotels and resorts to navigate
                  the platform.
                </p>

                <p>
                  There is one big change though that we want to note, and
                  that’s the more live video and local moments based on your
                  location.
                </p>

                <p>
                  We’ve gotten yet another new feature for Instagram Stories,
                  and this time it’s the Chat sticker.
                </p>
              </div>

              <div className="row">

                {/* Other Facilities */}
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="room__details__facilities">

                    <h2>Others facilities:</h2>

                    <div className="row">

                      <div className="col-lg-6">
                        <ul>
                          <li>
                            <span className="icon_check"></span>
                            Takami Bridal Attire
                          </li>

                          <li>
                            <span className="icon_check"></span>
                            Esthetic Salon
                          </li>

                          <li>
                            <span className="icon_check"></span>
                            Multilingual staff
                          </li>

                          <li>
                            <span className="icon_check"></span>
                            Dry cleaning and laundry
                          </li>

                          <li>
                            <span className="icon_check"></span>
                            Credit cards accepted
                          </li>
                        </ul>
                      </div>

                      <div className="col-lg-6">
                        <ul>
                          <li>
                            <span className="icon_check"></span>
                            Rent-a-car
                          </li>

                          <li>
                            <span className="icon_check"></span>
                            Reservation & confirmation
                          </li>

                          <li>
                            <span className="icon_check"></span>
                            Babysitter upon request
                          </li>

                          <li>
                            <span className="icon_check"></span>
                            24-hour currency exchange
                          </li>

                          <li>
                            <span className="icon_check"></span>
                            24-hour Manager on Duty
                          </li>
                        </ul>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Popular Facilities */}
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="room__details__more__facilities">

                    <h2>Most popular facilities:</h2>

                    <div className="row">

                      <div className="col-lg-6">

                        <div className="room__details__more__facilities__item">
                          <div className="icon">
                            <img
                              src="/assets/img/rooms/details/facilities/fac-1.png"
                              alt="facility"
                            />
                          </div>

                          <h6>Air Conditioning</h6>
                        </div>

                        <div className="room__details__more__facilities__item">
                          <div className="icon">
                            <img
                              src="/assets/img/rooms/details/facilities/fac-2.png"
                              alt="facility"
                            />
                          </div>

                          <h6>Cable TV</h6>
                        </div>

                        <div className="room__details__more__facilities__item">
                          <div className="icon">
                            <img
                              src="/assets/img/rooms/details/facilities/fac-3.png"
                              alt="facility"
                            />
                          </div>

                          <h6>Free drinks</h6>
                        </div>

                        <div className="room__details__more__facilities__item">
                          <div className="icon">
                            <img
                              src="/assets/img/rooms/details/facilities/fac-4.png"
                              alt="facility"
                            />
                          </div>

                          <h6>Unlimited Wifi</h6>
                        </div>

                      </div>

                      <div className="col-lg-6">

                        <div className="room__details__more__facilities__item">
                          <div className="icon">
                            <img
                              src="/assets/img/rooms/details/facilities/fac-5.png"
                              alt="facility"
                            />
                          </div>

                          <h6>Restaurant quality</h6>
                        </div>

                        <div className="room__details__more__facilities__item">
                          <div className="icon">
                            <img
                              src="/assets/img/rooms/details/facilities/fac-6.png"
                              alt="facility"
                            />
                          </div>

                          <h6>Service 24/24</h6>
                        </div>

                        <div className="room__details__more__facilities__item">
                          <div className="icon">
                            <img
                              src="/assets/img/rooms/details/facilities/fac-7.png"
                              alt="facility"
                            />
                          </div>

                          <h6>Gym Centre</h6>
                        </div>

                        <div className="room__details__more__facilities__item">
                          <div className="icon">
                            <img
                              src="/assets/img/rooms/details/facilities/fac-8.png"
                              alt="facility"
                            />
                          </div>

                          <h6>Spa & Wellness</h6>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDescription;