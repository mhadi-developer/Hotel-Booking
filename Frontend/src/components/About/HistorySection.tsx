const HistorySection = () => {
  return (
    <section className="history spad">
      <div className="container">

        {/* Title */}
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title history-title">
              <h5>Our History</h5>
              <h2>Explore Our Hotel</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="history__content">
          <div className="row">

            {/* Left Column */}
            <div className="col-lg-5 col-md-5">

              <div className="history__item left__item">
                <span>11 Dec 1990</span>
                <h4>Start Up Building Hotel</h4>
                <img src="/assets/img/history/history-1.jpg" alt="" />
                <p>
                  The young woman who turned a style setback into an envious outfit has officially inspired a major clothing retailer with her impromptu ingenuity
                </p>
              </div>

              <div className="history__item left__item mb-0">
                <span>29 Jan 1990</span>
                <h4>Building Pool In The Beach</h4>
                <img src="/assets/img/history/history-3.jpg" alt="" />
                <p>
                  The young woman who turned a style setback into an envious outfit has officially inspired a major clothing retailer with her impromptu ingenuity
                </p>
              </div>

            </div>

            {/* Right Column */}
            <div className="col-lg-5 offset-lg-2 col-md-5 offset-md-2">

              <div className="history__item right__first__item">
                <span>08 March 1990</span>
                <h4>Best Hotel Award Of The Year</h4>
                <img src="/assets/img/history/history-2.jpg" alt="" />
                <p>
                  The young woman who turned a style setback into an envious outfit has officially inspired a major clothing retailer with her impromptu ingenuity
                </p>
              </div>

              <div className="history__item mb-0">
                <span>06 July 1990</span>
                <h4>Open New Hotel In New York</h4>
                <img src="/assets/img/history/history-4.jpg" alt="" />
                <p>
                  The young woman who turned a style setback into an envious outfit has officially inspired a major clothing retailer with her impromptu ingenuity
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HistorySection;