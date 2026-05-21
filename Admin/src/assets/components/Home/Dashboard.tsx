import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Dashboard = () => {
  const chart1Ref = useRef<HTMLCanvasElement>(null);
  const chart2Ref = useRef<HTMLCanvasElement>(null);
  const chartInstance1 = useRef<Chart | null>(null);
  const chartInstance2 = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstance1.current) chartInstance1.current.destroy();
    if (chartInstance2.current) chartInstance2.current.destroy();

    if (chart1Ref.current) {
      chartInstance1.current = new Chart(chart1Ref.current, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Revenue",
              data: [18000, 22000, 19000, 27000, 24000, 30000, 28000, 35000, 31000, 26000, 33000, 40000],
              borderColor: "#5a8dee",
              backgroundColor: "rgba(90, 141, 238, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: false } },
        },
      });
    }

    if (chart2Ref.current) {
      chartInstance2.current = new Chart(chart2Ref.current, {
        type: "doughnut",
        data: {
          labels: ["Sales", "Revenue", "Expense"],
          datasets: [
            {
              data: [45, 35, 20],
              backgroundColor: ["#5a8dee", "#39da8a", "#ff5b5c"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { position: "bottom" } },
        },
      });
    }

    return () => {
      chartInstance1.current?.destroy();
      chartInstance2.current?.destroy();
    };
  }, []);

  return (
    <section className="section">
      <div className="container-fluid">
        {/* ========== title-wrapper start ========== */}
        <div className="title-wrapper pt-30">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="title">
                <h2>Hotel Management Dashboard</h2>
              </div>
            </div>

            <div className="col-md-6">
              <div className="breadcrumb-wrapper">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#0">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page"></li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Stats Cards ===== */}
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="icon-card mb-30">
              <div className="icon purple">
                <i className="lni lni-cart-full"></i>
              </div>
              <div className="content">
                <h6 className="mb-10">New Orders</h6>
                <h3 className="text-bold mb-10">34567</h3>
                <p className="text-sm text-success">
                  <i className="lni lni-arrow-up"></i> +2.00%
                  <span className="text-gray"> (30 days)</span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="icon-card mb-30">
              <div className="icon success">
                <i className="lni lni-dollar"></i>
              </div>
              <div className="content">
                <h6 className="mb-10">Total Income</h6>
                <h3 className="text-bold mb-10">$74,567</h3>
                <p className="text-sm text-success">
                  <i className="lni lni-arrow-up"></i> +5.45%
                  <span className="text-gray"> Increased</span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="icon-card mb-30">
              <div className="icon primary">
                <i className="lni lni-credit-cards"></i>
              </div>
              <div className="content">
                <h6 className="mb-10">Total Expense</h6>
                <h3 className="text-bold mb-10">$24,567</h3>
                <p className="text-sm text-danger">
                  <i className="lni lni-arrow-down"></i> -2.00%
                  <span className="text-gray"> Expense</span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="icon-card mb-30">
              <div className="icon orange">
                <i className="lni lni-user"></i>
              </div>
              <div className="content">
                <h6 className="mb-10">New User</h6>
                <h3 className="text-bold mb-10">34567</h3>
                <p className="text-sm text-danger">
                  <i className="lni lni-arrow-down"></i> -25.00%
                  <span className="text-gray"> Earning</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Charts Row ===== */}
        <div className="row">
          <div className="col-lg-7">
            <div className="card-style mb-30">
              <div className="title d-flex flex-wrap justify-content-between">
                <div className="left">
                  <h6 className="text-medium mb-10">Yearly Stats</h6>
                  <h3 className="text-bold">$245,479</h3>
                </div>
                <div className="right">
                  <div className="select-style-1">
                    <div className="select-position select-sm">
                      <select className="light-bg">
                        <option>Yearly</option>
                        <option>Monthly</option>
                        <option>Weekly</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chart">
                <canvas ref={chart1Ref} style={{ width: "100%", height: "400px" }}></canvas>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card-style mb-30">
              <div className="title d-flex flex-wrap align-items-center justify-content-between">
                <div className="left">
                  <h6 className="text-medium mb-30">Sales/Revenue</h6>
                </div>
                <div className="right">
                  <div className="select-style-1">
                    <div className="select-position select-sm">
                      <select className="light-bg">
                        <option>Yearly</option>
                        <option>Monthly</option>
                        <option>Weekly</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chart">
                <canvas ref={chart2Ref} style={{ width: "100%", height: "400px" }}></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Map + Table ===== */}
        <div className="row">
          <div className="col-lg-5">
            <div className="card-style mb-30">
              <div className="title d-flex justify-content-between align-items-center">
                <div className="left">
                  <h6 className="text-medium mb-30">Sells by State</h6>
                </div>
              </div>
              <div id="map" style={{ width: "100%", height: "400px", overflow: "hidden" }}></div>
              <p>Last updated: 7 days ago</p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card-style mb-30">
              <div className="title d-flex flex-wrap justify-content-between align-items-center">
                <div className="left">
                  <h6 className="text-medium mb-30">Top Selling Products</h6>
                </div>
                <div className="right">
                  <div className="select-style-1">
                    <div className="select-position select-sm">
                      <select className="light-bg">
                        <option>Yearly</option>
                        <option>Monthly</option>
                        <option>Weekly</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table top-selling-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th><h6 className="text-sm text-medium">Products</h6></th>
                      <th className="min-width"><h6 className="text-sm text-medium">Category</h6></th>
                      <th className="min-width"><h6 className="text-sm text-medium">Price</h6></th>
                      <th className="min-width"><h6 className="text-sm text-medium">Sold</h6></th>
                      <th className="min-width"><h6 className="text-sm text-medium">Profit</h6></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Arm Chair", category: "Interior", price: "$345", sold: 43, profit: "$45", image: "/assets/images/products/product-mini-1.jpg" },
                      { name: "Sofa", category: "Interior", price: "$145", sold: 13, profit: "$15", image: "/assets/images/products/product-mini-2.jpg" },
                      { name: "Dining Table", category: "Interior", price: "$95", sold: 32, profit: "$215", image: "/assets/images/products/product-mini-3.jpg" },
                    ].map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="check-input-primary">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="product">
                            <div className="image">
                              <img src={item.image} alt={item.name} />
                            </div>
                            <p className="text-sm">{item.name}</p>
                          </div>
                        </td>
                        <td><p className="text-sm">{item.category}</p></td>
                        <td><p className="text-sm">{item.price}</p></td>
                        <td><p className="text-sm">{item.sold}</p></td>
                        <td><p className="text-sm">{item.profit}</p></td>
                        <td>
                          <div className="action justify-content-end">
                            <button className="more-btn ml-10 dropdown-toggle" data-bs-toggle="dropdown">
                              <i className="lni lni-more-alt"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li className="dropdown-item"><a href="#0" className="text-gray">Remove</a></li>
                              <li className="dropdown-item"><a href="#0" className="text-gray">Edit</a></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Calendar + Sales History ===== */}
        <div className="row">
          <div className="col-lg-5">
            <div className="card-style calendar-card mb-30">
              <div id="calendar-mini"></div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card-style mb-30">
              <div className="title d-flex flex-wrap align-items-center justify-content-between">
                <div className="left">
                  <h6 className="text-medium mb-30">Sales History</h6>
                </div>
                <div className="right">
                  <div className="select-style-1">
                    <div className="select-position select-sm">
                      <select className="light-bg">
                        <option>Today</option>
                        <option>Yesterday</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table top-selling-table">
                  <thead>
                    <tr>
                      <th><h6 className="text-sm text-medium">Products</h6></th>
                      <th className="min-width"><h6 className="text-sm text-medium">Category</h6></th>
                      <th className="min-width"><h6 className="text-sm text-medium">Revenue</h6></th>
                      <th className="min-width"><h6 className="text-sm text-medium">Status</h6></th>
                      <th><h6 className="text-sm text-medium text-end">Actions</h6></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Bedroom", category: "Interior", revenue: "$345", status: "Pending", statusClass: "close-btn", image: "/assets/images/products/product-mini-1.jpg" },
                      { name: "Arm Chair", category: "Interior", revenue: "$345", status: "Refund", statusClass: "warning-btn", image: "/assets/images/products/product-mini-2.jpg" },
                      { name: "Sofa", category: "Interior", revenue: "$345", status: "Completed", statusClass: "success-btn", image: "/assets/images/products/product-mini-3.jpg" },
                    ].map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="product">
                            <div className="image">
                              <img src={item.image} alt={item.name} />
                            </div>
                            <p className="text-sm">{item.name}</p>
                          </div>
                        </td>
                        <td><p className="text-sm">{item.category}</p></td>
                        <td><p className="text-sm">{item.revenue}</p></td>
                        <td><span className={`status-btn ${item.statusClass}`}>{item.status}</span></td>
                        <td>
                          <div className="action justify-content-end">
                            <button className="edit">
                              <i className="lni lni-pencil"></i>
                            </button>
                            <button className="more-btn ml-10 dropdown-toggle" data-bs-toggle="dropdown">
                              <i className="lni lni-more-alt"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li className="dropdown-item"><a href="#0" className="text-gray">Remove</a></li>
                              <li className="dropdown-item"><a href="#0" className="text-gray">Edit</a></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;