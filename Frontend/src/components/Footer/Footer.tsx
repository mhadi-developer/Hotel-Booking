import React from "react";

const Footer = () => {
  return (
    <footer className="footer set-bg" data-setbg="/assets/img/footer-bg.jpg">

      <div className="container">
        <div className="row">

          <div className="col-lg-12">
            <div className="logo__carousel owl-carousel">

              <div className="logo__carousel__item">
                <a href="#"><img src="/assets/img/logo/logo-1.png" alt="" /></a>
              </div>

              <div className="logo__carousel__item">
                <a href="#"><img src="/assets/img/logo/logo-2.png" alt="" /></a>
              </div>

              <div className="logo__carousel__item">
                <a href="#"><img src="/assets/img/logo/logo-3.png" alt="" /></a>
              </div>

              <div className="logo__carousel__item">
                <a href="#"><img src="/assets/img/logo/logo-4.png" alt="" /></a>
              </div>

              <div className="logo__carousel__item">
                <a href="#"><img src="/assets/img/logo/logo-5.png" alt="" /></a>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="container">
        <div className="footer__content">

          <div className="row">

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer__about">

                <div className="footer__logo">
                  <a href="#"><img src="/assets/img/logo.png" alt="" /></a>
                </div>

                <h4>(123) 456-78-91096</h4>

                <ul>
                  <li>Ernser Vista Suite 437, NY</li>
                  <li>Info.colorlib@gmail.com</li>
                </ul>

                <div className="footer__social">
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-twitter"></i></a>
                  <a href="#"><i className="fa fa-linkedin"></i></a>
                  <a href="#"><i className="fa fa-youtube-play"></i></a>
                </div>

              </div>
            </div>

            <div className="col-lg-3 offset-lg-1 col-md-5 offset-md-1 col-sm-6">
              <div className="footer__widget">

                <h4>Quick Link</h4>

                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Booking</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Review</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>

                <ul>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Our Room</a></li>
                  <li><a href="#">Restaurants</a></li>
                  <li><a href="#">Payments</a></li>
                  <li><a href="#">Events</a></li>
                </ul>

              </div>
            </div>

            <div className="col-lg-5 col-md-8 col-sm-12">
              <div className="footer__newslatter">

                <h4>Subscribe our newlatester</h4>

                <form action="#">
                  <input type="text" placeholder="Your E-mail Address" />
                  <button type="submit">Subscribe</button>
                </form>

                <div className="footer__newslatter__find">
                  <h5>Find Us:</h5>

                  <div className="footer__newslatter__find__links">
                    <a href="#"><i className="fa fa-tripadvisor"></i></a>
                    <a href="#"><i className="fa fa-map-o"></i></a>
                    <a href="#"><i className="fa fa-dribbble"></i></a>
                    <a href="#"><i className="fa fa-forumbee"></i></a>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

        <div className="footer__copyright">

          <div className="row">

            <div className="col-lg-7 col-md-7">

              <div className="footer__copyright__text">
                <p>
                  Copyright &copy;{" "}
                  {new Date().getFullYear()} All rights reserved | This template is made with{" "}
                  <i className="fa fa-heart" aria-hidden="true"></i> by{" "}
                  <a href="https://colorlib.com" target="_blank" rel="noreferrer">
                    Colorlib
                  </a>
                </p>
              </div>

            </div>

            <div className="col-lg-5 col-md-5">
              <ul className="footer__copyright__links">
                <li><a href="#">Terms Of Use</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;