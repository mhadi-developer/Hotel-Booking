import React, { useEffect, useState } from "react";
import { useRooms } from "../../hooks/useRooms";

const HeroSection = () => {
  const { fetchedRooms } = useRooms();

  const [showCheckout, setShowCheckout] = useState(false);

  const [formData, setFormData] = useState({
    room: "",
    checkIn: "",
    checkOut: "",
    persons: "1",
  });

  // jQuery plugins (only UI enhancements)
  useEffect(() => {
    const $ = (window as any).$;

    if ($?.fn?.niceSelect) {
      $("select").niceSelect("destroy");
      $("select").niceSelect();
    }

    if ($?.fn?.datepicker) {
      $(".datepicker_pop").datepicker();
    }
  }, [fetchedRooms]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookNow = () => {
    setShowCheckout(true);
  };

  return (
    <section
      className="hero spad mb-5"
      style={{
        backgroundImage: "url('/assets/img/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">

            {/* HERO TEXT */}
            <div className="hero__text">
              <h5>WELCOME HIROTO</h5>
              <h2>Experience the greatest for your holidays.</h2>
            </div>

            {/* FORM */}
            <form className="filter__form">

              {/* ROOM SELECT */}
              <div className="filter__form__item filter__form__item--search">
                <p>Rooms</p>

                <div className="filter__form__select">
                  <select
                    name="room"
                    defaultValue=""
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select a room
                    </option>

                    {fetchedRooms?.map((room) => (
                      <option key={room.id} value={room.name}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* CHECK IN */}
              <div className="filter__form__item">
                <p>Check In</p>

                <div className="filter__form__datepicker">
                  <span className="icon_calendar"></span>

                  <input
                    type="text"
                    name="checkIn"
                    className="datepicker_pop check__in"
                    placeholder="Check In"
                    onChange={handleChange}
                  />

                  <i className="arrow_carrot-down"></i>
                </div>
              </div>

              {/* CHECK OUT */}
              <div className="filter__form__item">
                <p>Check Out</p>

                <div className="filter__form__datepicker">
                  <span className="icon_calendar"></span>

                  <input
                    type="text"
                    name="checkOut"
                    className="datepicker_pop check__out"
                    placeholder="Check Out"
                    onChange={handleChange}
                  />

                  <i className="arrow_carrot-down"></i>
                </div>
              </div>

              {/* PERSON */}
              <div className="filter__form__item filter__form__item--select">
                <p>Person</p>

                <div className="filter__form__select">
                  <span className="icon_group"></span>

                  <select
                    name="persons"
                    value={formData.persons}
                    onChange={handleChange}
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4 Persons</option>
                    <option value="5">5 Persons</option>
                  </select>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="button"
                onClick={handleBookNow}
              >
                BOOK NOW
              </button>
            </form>

            {/* CHECKOUT SECTION */}
            {showCheckout && (
              <div className="checkout-section mt-4 p-4 bg-white rounded shadow">

                <h3>Proceed to Checkout</h3>

                <div className="mt-3">
                  <p><b>Room:</b> {formData.room || "Not selected"}</p>
                  <p><b>Check In:</b> {formData.checkIn || "Not selected"}</p>
                  <p><b>Check Out:</b> {formData.checkOut || "Not selected"}</p>
                  <p><b>Persons:</b> {formData.persons}</p>
                </div>

                <button className="primary-btn mt-3">
                  Confirm Booking
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;