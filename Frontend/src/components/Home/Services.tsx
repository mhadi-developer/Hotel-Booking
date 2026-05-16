import React from "react";

const Services = () => {
  return (
    <section className="services spad py-5 my-5">

      <div className="container">
        <div className="row">

          <div className="col-lg-4 col-md-4 col-sm-6 service-card">
            <div className="services__item">
              <img src="/assets/img/services/services-1.png" alt="" />
              <h4>Free Wi-Fi</h4>
              <p>
                The massive investment in a hotel or resort requires constant reviews and control in order to
                make it a successful investment.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="services__item">
              <img src="/assets/img/services/services-2.png" alt="" />
              <h4>Premium Pool</h4>
              <p>
                Choose from 4 unique ready made concepts, let us help you create the concept perfect for you
                or let HCA.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="services__item">
              <img src="/assets/img/services/services-3.png" alt="" />
              <h4>Coffee Maker</h4>
              <p>
                HCA's Owner's Representation is taking care of just these important factors, may it be
                through regular site visits and spot checks.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="services__item">
              <img src="/assets/img/services/services-4.png" alt="" />
              <h4>Bar Wine</h4>
              <p>
                For properties with third party management companies, HCA Consultants will as well administer
                the terms and conditions.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="services__item">
              <img src="/assets/img/services/services-5.png" alt="" />
              <h4>TV HD</h4>
              <p>
                We provide a critical analysis of a hotel's marketing strategy, bench-marking it against
                industry and competitive practices.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="services__item">
              <img src="/assets/img/services/services-6.png" alt="" />
              <h4>Restaurant</h4>
              <p>
                A hotel and restaurant investment deserves careful and market oriented financial planning and
                projections.
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Services;