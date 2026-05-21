const ChooseUs = () => {
  return (
    <div
      className="chooseus spad set-bg"
      style={{
        backgroundImage: "url('/assets/img/chooseus-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="chooseus__text">

              <div className="section-title">
                <h5>WHY CHOOSE US</h5>

                <h2>
                  Contact us now to get the latest deals and for the next booking
                </h2>
              </div>

              <a href="/" className="primary-btn">
                Booking Now
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;