import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/headers.css"
import axiosInstance from "../../resources/axios.Instance.create";

const Header = () => {
  const { loggedInUser, logout } = useAuth();
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    const getUserBookings = async () => {
       try {
         const response = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/get/bookings`);
         if (response.status === 200 || response.status === 201) {
           setUserBookings(response.data.fetchedAllUserBookings)
         }
       } catch (error) {
        console.log(error);
        
       }
    }

    getUserBookings();
   },[])

  return (
    <>
      

      <header className="header">

        {/* Header Top */}
        <div className="header__top">
          <div className="container">
            <div className="row">

              <div className="col-lg-7">
                <ul className="header__top__widget">
                  <li>
                    <span className="icon_pin_alt"></span>
                    96 Ernser Vista Suite 437, NY, US
                  </li>

                  <li>
                    <span className="icon_phone"></span>
                    (123) 456-78-910
                  </li>
                </ul>
              </div>

              <div className="col-lg-5">
                <div className="header__top__right">

                  {/* Authentication */}
                  <div className="header__top__auth">

                    {loggedInUser?.role ? (

                      <div className="user-menu">

                        <button
                          className="btn btn-dark d-flex align-items-center gap-2"
                          type="button"
                        >
                          <span className="fw-semibold">
                            {
                              loggedInUser?.firstname ||
                              loggedInUser?.lastName ||
                              loggedInUser?.email
                            }
                          </span>
                        </button>

                        {/* Custom Dropdown */}
                        <div className="user-dropdown">

                          <Link
                            to="/profile"
                            className="user-dropdown-item"
                          >
                            Profile
                          </Link>

                          <hr className="m-1" />

                          <button
                            className="user-dropdown-item logout-btn"
                            onClick={logout}
                          >
                            Logout
                          </button>

                        </div>

                      </div>

                    ) : (

                      <ul className="d-flex gap-3 list-unstyled mb-0">

                        <li>
                          <Link to="/login">
                            Login
                          </Link>
                        </li>

                        <li>
                          <Link to="/register">
                            Register
                          </Link>
                        </li>

                      </ul>

                    )}

                  </div>

                  {/* Language */}
                  <div className="header__top__language">

                    <img
                      src="/assets/img/lan.png"
                      alt="language"
                    />

                    <span>English</span>

                    <i className="fa fa-angle-down"></i>

                    <ul>
                      <li>English</li>
                      <li>Bangla</li>
                    </ul>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

       {/* NAV SECTION */}
        <div className="header__nav__option">
          <div className="container">
            <div className="row">
              <div className="col-lg-2">
                <div className="header__logo">
                  <Link to="/">
                    <img src="/assets/img/logo.png" alt="logo" />
                  </Link>
                </div>
              </div>

              <div className="col-lg-10">
                <div className="header__nav">

                  <nav className="header__menu">
                    <ul className="menu__class">

                      <li>
                        <Link to="/">Home</Link>
                      </li>

                      <li>
                        <Link to="/rooms">Rooms</Link>
                      </li>

                      <li>
                        <Link to="/about-us">About Us</Link>
                      </li>
                      <li>
                        <Link to="/book-now">Book Now</Link>
                      </li>

                    </ul>
                    <div className="position-relative d-inline-block text-white">
                      <Link to={"/booking/cart"}>
                         <i className="bi bi-suitcase-lg fs-3"></i>
                      </Link>
   

    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {
                        userBookings.length
        }
    </span>
</div>
                  </nav>

                </div>
              </div>

            </div>
          </div>
        </div>

      </header>
    </>
  );
};

export default Header;