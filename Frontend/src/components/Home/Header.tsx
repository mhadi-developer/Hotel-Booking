import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { loggedInUser, logout } = useAuth();

  return (
    <>
      {/* Local Component Styles */}
      <style>
        {`
          .user-menu {
            position: relative;
            display: inline-block;
          }

          .user-dropdown {
            position: absolute;
            top: 115%;
            right: 0;
            min-width: 220px;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.12);
            padding: 10px 0;
            z-index: 99999;

            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.25s ease;
          }

          .user-menu:hover .user-dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }

          .user-dropdown-item {
            display: block;
            width: 100%;
            padding: 12px 18px;
            text-decoration: none;
            color: #222;
            background: transparent;
            border: none;
            text-align: left;
            transition: background 0.2s ease;
            cursor: pointer;
            font-size: 14px;
          }

          .user-dropdown-item:hover {
            background: #f5f5f5;
          }

          .logout-btn {
            color: #dc3545;
            font-weight: 500;
          }
        `}
      </style>
      <style>
        {`
          /* MAIN MENU */
          .menu__class {
            display: flex;
            gap: 20px;
            align-items: center;
          }

          .menu__class li {
            position: relative;
            list-style: none;
          }

          .menu__class a {
            text-decoration: none;
            color: #111;
            padding: 10px;
            display: block;
          }

          /* SUBMENU FIX */
          .submenu {
            position: absolute;
            top: 120%;
            left: 0;
            min-width: 200px;
            background: #fff;
            box-shadow: 0 10px 25px rgba(0,0,0,0.12);
            border-radius: 8px;
            padding: 10px 0;

            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.2s ease;

            z-index: 9999;
          }

          /* SHOW ON HOVER */
          .menu__class li:hover > .submenu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }

          /* SUBMENU ITEMS */
          .submenu li {
            width: 100%;
          }

          .submenu a {
            padding: 10px 16px;
            display: block;
            color: #222;
          }

          .submenu a:hover {
            background: #f5f5f5;
          }

          /* SAFE HEADER LAYOUT */
          .header__menu {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
        `}
      </style>

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
                        <Link to="/about">About Us</Link>
                      </li>

                      {/* SUBMENU FIXED SECTION */}
                      <li>
                        <a href="#">Pages</a>

                        <ul className="submenu">
                          <li>
                            <Link to="/about">About Us</Link>
                          </li>

                          <li>
                            <Link to="/room-details">Room Details</Link>
                          </li>

                          <li>
                            <Link to="/blog-details">Blog Details</Link>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <Link to="/blog">News</Link>
                      </li>

                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>

                    </ul>
                  </nav>

                  <div className="header__nav__widget">
                    <a href="#">
                      Book Now <span className="arrow_right"></span>
                    </a>
                  </div>

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