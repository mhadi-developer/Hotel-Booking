import React from "react";

const Header = ({ onMenuToggle }) => {
  return (
    <header className="header">
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Left Side */}
          <div className="col-lg-5 col-md-5 col-6">
            <div className="header-left d-flex align-items-center">

              {/* Menu Toggle */}
              <div
                className="menu-toggle-btn me-3"
                style={{ display: "block", zIndex: 999 }}
              >
                <button
                  type="button"
                  id="menu-toggle"
                  className="btn btn-primary d-flex align-items-center"
                  onClick={onMenuToggle}
                >
                  <i className="lni lni-menu me-2"></i>
                  Menu
                </button>
              </div>

              {/* Search */}
              <div className="header-search d-none d-md-flex">
                <form action="#">
                  <input type="text" placeholder="Search..." />
                  <button type="submit">
                    <i className="lni lni-search-alt"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-lg-7 col-md-7 col-6">
            <div className="header-right d-flex justify-content-end align-items-center">

              {/* Notification */}
              <div className="notification-box ms-3 d-none d-md-flex">
                <button
                  className="dropdown-toggle border-0 bg-transparent"
                  type="button"
                  id="notification"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 20.1667C9.88317 20.1667 8.88718 19.63 8.23901 18.7917H13.761C13.113 19.63 12.1169 20.1667 11 20.1667Z" fill="currentColor" />
                    <path d="M10.1157 2.74999C10.1157 2.24374 10.5117 1.83333 11 1.83333C11.4883 1.83333 11.8842 2.24374 11.8842 2.74999V2.82604C14.3932 3.26245 16.3051 5.52474 16.3051 8.24999V14.287C16.3051 14.5301 16.3982 14.7633 16.564 14.9352L18.2029 16.6342C18.4814 16.9229 18.2842 17.4167 17.8903 17.4167H4.10961C3.71574 17.4167 3.5185 16.9229 3.797 16.6342L5.43589 14.9352C5.6017 14.7633 5.69485 14.5301 5.69485 14.287V8.24999C5.69485 5.52474 7.60672 3.26245 10.1157 2.82604V2.74999Z" fill="currentColor" />
                  </svg>
                  <span></span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notification">
                  <li>
                    <a href="#0" className="dropdown-item">
                      <div className="d-flex align-items-start gap-2">
                        <div className="image">
                          <img src="/assets/images/lead/lead-6.png" alt="notification" />
                        </div>
                        <div className="content">
                          <h6 className="mb-1">John Doe <span className="text-regular"> comment on a product.</span></h6>
                          <p className="mb-1">Lorem ipsum dolor sit amet.</p>
                          <span>10 mins ago</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Messages */}
              <div className="header-message-box ms-3 d-none d-md-flex">
                <button
                  className="dropdown-toggle border-0 bg-transparent"
                  type="button"
                  id="message"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.74866 5.97421C7.91444 5.96367 8.08162 5.95833 8.25005 5.95833C12.5532 5.95833 16.0417 9.4468 16.0417 13.75C16.0417 13.9184 16.0364 14.0856 16.0259 14.2514C16.3246 14.138 16.6127 14.003 16.8883 13.8482L19.2306 14.629C19.7858 14.8141 20.3141 14.2858 20.129 13.7306L19.3482 11.3882C19.8694 10.4604 20.1667 9.38996 20.1667 8.25C20.1667 4.70617 17.2939 1.83333 13.75 1.83333C11.0077 1.83333 8.66702 3.55376 7.74866 5.97421Z" fill="currentColor" />
                    <path d="M14.6667 13.75C14.6667 17.2938 11.7939 20.1667 8.25004 20.1667C7.11011 20.1667 6.03962 19.8694 5.11182 19.3482L2.76946 20.129C2.21421 20.3141 1.68597 19.7858 1.87105 19.2306L2.65184 16.8882C2.13062 15.9604 1.83338 14.89 1.83338 13.75C1.83338 10.2062 4.70622 7.33333 8.25004 7.33333C11.7939 7.33333 14.6667 10.2062 14.6667 13.75Z" fill="currentColor" />
                  </svg>
                  <span></span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="message">
                  <li>
                    <a href="#0" className="dropdown-item">
                      <div className="d-flex align-items-start gap-2">
                        <div className="image">
                          <img src="/assets/images/lead/lead-5.png" alt="message" />
                        </div>
                        <div className="content">
                          <h6 className="mb-1">Jacob Jones</h6>
                          <p className="mb-1">Hey! I came across your profile...</p>
                          <span>10 mins ago</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Profile */}
              <div className="profile-box ms-3">
                <button
                  className="dropdown-toggle bg-transparent border-0"
                  type="button"
                  id="profile"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="profile-info">
                    <div className="info d-flex align-items-center">
                      <div className="image">
                        <img src="/assets/images/profile/profile-image.png" alt="Profile" />
                      </div>
                      <div className="ms-2 d-none d-sm-block">
                        <h6 className="fw-500 mb-0">Adam Joe</h6>
                        <p className="mb-0">Admin</p>
                      </div>
                    </div>
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profile">
                  <li>
                    <div className="author-info d-flex align-items-center p-2">
                      <div className="image">
                        <img src="/assets/images/profile/profile-image.png" alt="profile" />
                      </div>
                      <div className="content ms-2">
                        <h6 className="mb-0">Adam Joe</h6>
                        <a className="text-muted small" href="mailto:email@gmail.com">email@gmail.com</a>
                      </div>
                    </div>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#0"><i className="lni lni-user me-2"></i>View Profile</a></li>
                  <li><a className="dropdown-item" href="#0"><i className="lni lni-alarm me-2"></i>Notifications</a></li>
                  <li><a className="dropdown-item" href="#0"><i className="lni lni-inbox me-2"></i>Messages</a></li>
                  <li><a className="dropdown-item" href="#0"><i className="lni lni-cog me-2"></i>Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#0"><i className="lni lni-exit me-2"></i>Sign Out</a></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;