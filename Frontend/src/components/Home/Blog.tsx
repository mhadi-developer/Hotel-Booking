import React from "react";

const LatestBlog = () => {
  return (
    <section className="latest-blog spad my-5">
      <div className="container">

        {/* TITLE */}
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h5>NEWS & EVENT</h5>
              <h2>From Our Blog</h2>
            </div>
          </div>
        </div>

        <div className="row">

          {/* ITEM 1 */}
          <div className="col-lg-3 p-0 order-lg-1 col-md-6 order-md-1">
            <div
              className="latest__blog__pic"
              style={{
                backgroundImage: "url('/assets/img/latest-blog/lb-1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
                minHeight: "250px",
              }}
            />
          </div>

          <div className="col-lg-3 p-0 order-lg-2 col-md-6 order-md-2">
            <div className="latest__blog__text">
              <div className="label">Hotel</div>
              <h5>Ut enim ad minim veniam, quis nostrud</h5>
              <p>
                <i className="fa fa-clock-o"></i> 19th March, 2019
              </p>
              <a href="#">Read More</a>
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="col-lg-3 p-0 order-lg-3 col-md-6 order-md-4">
            <div
              className="latest__blog__pic"
              style={{
                backgroundImage: "url('/assets/img/latest-blog/lb-2.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "250px",
              }}
            />
          </div>

          <div className="col-lg-3 p-0 order-lg-4 col-md-6 order-md-3">
            <div className="latest__blog__text">
              <div className="label">Restaurant</div>
              <h5>Ut enim ad minim veniam, quis nostrud</h5>
              <p>
                <i className="fa fa-clock-o"></i> 22th March, 2019
              </p>
              <a href="#">Read More</a>
            </div>
          </div>

          {/* ITEM 3 */}
          <div className="col-lg-3 p-0 order-lg-6 col-md-6 order-md-5">
            <div
              className="latest__blog__pic"
              style={{
                backgroundImage: "url('/assets/img/latest-blog/lb-3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "250px",
              }}
            />
          </div>

          <div className="col-lg-3 p-0 order-lg-5 col-md-6 order-md-6">
            <div className="latest__blog__text">
              <div className="label">Travel</div>
              <h5>Ut enim ad minim veniam, quis nostrud</h5>
              <p>
                <i className="fa fa-clock-o"></i> 25th March, 2019
              </p>
              <a href="#">Read More</a>
            </div>
          </div>

          {/* ITEM 4 */}
          <div className="col-lg-3 p-0 order-lg-8 col-md-6 order-md-8">
            <div
              className="latest__blog__pic"
              style={{
                backgroundImage: "url('/assets/img/latest-blog/lb-4.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "250px",
              }}
            />
          </div>

          <div className="col-lg-3 p-0 order-lg-7 col-md-6 order-md-7">
            <div className="latest__blog__text">
              <div className="label">Booking</div>
              <h5>Ut enim ad minim veniam, quis nostrud</h5>
              <p>
                <i className="fa fa-clock-o"></i> 29th March, 2019
              </p>
              <a href="#">Read More</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LatestBlog;