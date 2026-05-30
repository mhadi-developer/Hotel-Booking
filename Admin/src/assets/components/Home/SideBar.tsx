import React, { useState } from "react";
import "../../utils/css/sidebar.css";
import { Link } from "react-router";

type DropdownKey = "dashboard" | "pages" | "auth";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const [openMenus, setOpenMenus] = useState<Record<DropdownKey, boolean>>({
    dashboard: true,
    pages: false,
    auth: false,
  });

  const toggleMenu = (key: DropdownKey) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <aside className={`sidebar-nav-wrapper ${isOpen ? "active" : ""}`}>
        {/* Logo */}
        <div className="navbar-logo">
          <a href="index.html">
            <img src="/assets/images/logo/logo.svg" alt="logo" />
          </a>
        </div>

        {/* Sidebar Navigation */}
        <nav className="sidebar-nav">
           {/* Dashboard */}
          <ul>
           
            <li className="nav-item nav-item-has-children">
              <a href="#0" onClick={(e) => { e.preventDefault(); toggleMenu("dashboard"); }}>
                <span className="icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.74999 18.3333C12.2376 18.3333 15.1364 15.8128 15.7244 12.4941C15.8448 11.8143 15.2737 11.25 14.5833 11.25H9.99999C9.30966 11.25 8.74999 10.6903 8.74999 10V5.41666C8.74999 4.7263 8.18563 4.15512 7.50586 4.27556C4.18711 4.86357 1.66666 7.76243 1.66666 11.25C1.66666 15.162 4.83797 18.3333 8.74999 18.3333Z" />
                    <path d="M17.0833 10C17.7737 10 18.3432 9.43708 18.2408 8.75433C17.7005 5.14918 14.8508 2.29947 11.2457 1.75912C10.5629 1.6568 10 2.2263 10 2.91665V9.16666C10 9.62691 10.3731 10 10.8333 10H17.0833Z" />
                  </svg>
                </span>
                <span className="text">Dashboard</span>
              </a>
              {openMenus.dashboard && (
                <ul className="dropdown-nav">
                  <li><a href="index.html" className="active">Hotel-Managment</a></li>
                </ul>
              )}
            </li>

            {/* Pages */}
            <li className="nav-item nav-item-has-children">
              <a href="#0" onClick={(e) => { e.preventDefault(); toggleMenu("pages"); }}>
                <span className="icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.8097 1.66667C11.8315 1.66667 11.8533 1.6671 11.875 1.66796V4.16667C11.875 5.43232 12.901 6.45834 14.1667 6.45834H16.6654C16.6663 6.48007 16.6667 6.50186 16.6667 6.5237V16.6667C16.6667 17.5872 15.9205 18.3333 15 18.3333H5.00001C4.07954 18.3333 3.33334 17.5872 3.33334 16.6667V3.33334C3.33334 2.41286 4.07954 1.66667 5.00001 1.66667H11.8097Z" />
                  </svg>
                </span>
                <span className="text">Pages</span>
              </a>
              {openMenus.pages && (
                <ul className="dropdown-nav">
                  <li><a href="settings.html">Settings</a></li>
                  <li><Link to="/add/room">Add Room</Link></li>
                  <li><Link to={"/manage/bookings"} >Manage Booking</Link></li>

                  

                  
                </ul>
              )}
            </li>



            {/* Profile */}
            <li className="nav-item">
              <a href="profile.html">
                <span className="icon">👤</span>
                <span className="text">Profile <span className="pro-badge">Pro</span></span>
              </a>
            </li>

            {/* Invoice */}
            <li className="nav-item">
              <a href="invoice.html">
                <span className="icon">🧾</span>
                <span className="text">Invoice</span>
              </a>
            </li>

            <span className="divider"><hr /></span>

            {/* Auth */}
            <li className="nav-item nav-item-has-children">
              <a href="#0" onClick={(e) => { e.preventDefault(); toggleMenu("auth"); }}>
                <span className="icon">🔐</span>
                <span className="text">Auth</span>
              </a>
              {openMenus.auth && (
                <ul className="dropdown-nav">
                  <li><a href="signin.html">Sign In</a></li>
                  <li><a href="signup.html">Sign Up</a></li>
                  <li><a href="reset-password.html"><span className="text">Reset Password <span className="pro-badge">Pro</span></span></a></li>
                </ul>
              )}
            </li>

            {/* Tables */}
            <li className="nav-item">
              <a href="tables.html">
                <span className="icon">📊</span>
                <span className="text">Tables</span>
              </a>
            </li>

            {/* Notifications */}
            <li className="nav-item">
              <a href="notification.html">
                <span className="icon">🔔</span>
                <span className="text">Notifications</span>
              </a>
            </li>
          </ul>
        </nav>

        
    
      </aside>

      {/* Overlay */}
      <div className={`overlay ${isOpen ? "active" : ""}`} onClick={() => {}}></div>
    </>
  );
};

export default Sidebar;