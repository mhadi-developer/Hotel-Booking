import React from "react";

const HomeAbout = () => {
  return (
    <section className="home-about">

      <div className="container">
        <div className="row">

          <div className="col-lg-6">
            <div className="home__about__text">

              <div className="section-title">
                <h5>ABOUT US</h5>
                <h2>Welcome Hiroto Hotel In Street L’Abreuvoir</h2>
              </div>

              <p className="first-para">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>

              <p className="last-para">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque.
              </p>

              <img src="/assets/img/home-about/sign.png" alt="" />

            </div>
          </div>

          <div className="col-lg-6">
            <div className="home__about__pic">
              <img src="/assets/img/home-about/home-about.png" alt="" />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default HomeAbout;