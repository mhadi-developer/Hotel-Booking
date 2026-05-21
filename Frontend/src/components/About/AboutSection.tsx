const AboutSection = () => {
  const services = [
    {
      img: "/assets/img/services/services-1.png",
      title: "Free Wi-Fi",
      desc: "The massive investment in a hotel or resort requires constant reviews and control in order to make it a successful investment.",
    },
    {
      img: "/assets/img/services/services-2.png",
      title: "Premium Pool",
      desc: "Choose from 4 unique ready made concepts, let us help you create the concept perfect for you or let HCA.",
    },
    {
      img: "/assets/img/services/services-3.png",
      title: "Coffee Maker",
      desc: "HCA's Owner's Representation is taking care of just these important factors, may it be through regular site visits and spot checks.",
    },
    {
      img: "/assets/img/services/services-4.png",
      title: "Bar Wine",
      desc: "For properties with third party management companies, HCA Consultants will as well administer the terms and conditions.",
    },
    {
      img: "/assets/img/services/services-5.png",
      title: "TV HD",
      desc: "We provide a critical analysis of a hotel's marketing strategy, bench-marking it against industry and competitive practices.",
    },
    {
      img: "/assets/img/services/services-6.png",
      title: "Restaurant",
      desc: "A hotel and restaurant investment deserves careful and market oriented financial planning and projections.",
    },
  ];

  return (
    <section className="about spad">
      <div className="container">

        {/* Header Section */}
        <div className="about__content">
          <div className="row">

            <div className="col-lg-5">
              <div className="section-title">
                <h5>Our Specialization</h5>
                <h2>Welcome Hiroto</h2>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="about__text">
                <p>
                  Metasurfaces are generally designed by placing scatterers in periodic or pseudo-periodic grids.
                </p>
                <p>
                  I am convinced the only way to make money online is to have a consistent Advertising plan. A plan you are willing to work hard on and commit to for a selected period of time.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Services Grid */}
        <div className="row">
          {services.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-4 col-sm-6">
              <div className="services__item">

                <img src={item.img} alt={item.title} />

                <h4>{item.title}</h4>

                <p>{item.desc}</p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;