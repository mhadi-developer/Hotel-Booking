import { Link, useLocation } from "react-router";


const Breadcrumb = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];
  const routeName =
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1);


  return (
    <div
      className="breadcrumb-option set-bg"
      style={{ backgroundImage: "url('/assets/img/breadcrumb-bg.jpg')" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb__text">
              <h1>{ routeName}</h1>

              <div className="breadcrumb__links">
                <Link to="/">Home</Link>
                {currentPath && <span>{routeName}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;