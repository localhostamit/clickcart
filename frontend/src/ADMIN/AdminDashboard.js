import AdminSidebar from "../Components/Admin/AdminSidebar";
function AdminDashboard() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-2 p-0">
          <AdminSidebar />
        </div>
        {/* Main Content */}
        <div className="col-lg-10 bg-light min-vh-100">
          <div className="p-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold mb-1">
                  Dashboard
                </h2>
                <p className="text-muted mb-0">
                  Welcome back, Admin 👋
                </p>
              </div>
              <div>
                <span className="badge bg-success p-2">
                  <i className="bi bi-circle-fill me-2"></i>
                  System Online
                </span>
              </div>
            </div>
            {/* Statistics */}
            <div className="row g-4 mb-4">
              {/* Products */}
              <div className="col-md-6 col-xl-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="text-muted mb-2">
                          Total Products
                        </p>
                        <h3 className="fw-bold mb-0">
                          32
                        </h3>
                        <small className="text-success">
                          <i className="bi bi-arrow-up"></i>
                          12% this month
                        </small>
                      </div>
                      <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                        <i className="bi bi-box-seam fs-3 text-primary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Orders */}
              <div className="col-md-6 col-xl-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="text-muted mb-2">
                          Total Orders
                        </p>
                        <h3 className="fw-bold mb-0">
                          156
                        </h3>
                        <small className="text-success">
                          <i className="bi bi-arrow-up"></i>
                          8% this month
                        </small>
                      </div>
                      <div className="bg-success bg-opacity-10 rounded-circle p-3">
                        <i className="bi bi-cart-check fs-3 text-success"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Users */}
              <div className="col-md-6 col-xl-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="text-muted mb-2">
                          Total Users
                        </p>
                        <h3 className="fw-bold mb-0">
                          1,248
                        </h3>
                        <small className="text-success">
                          <i className="bi bi-arrow-up"></i>
                          15% this month
                        </small>
                      </div>
                      <div className="bg-warning bg-opacity-10 rounded-circle p-3">
                        <i className="bi bi-people fs-3 text-warning"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Revenue */}
              <div className="col-md-6 col-xl-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="text-muted mb-2">
                          Total Revenue
                        </p>
                        <h3 className="fw-bold mb-0">
                          ₹2,45,890
                        </h3>
                        <small className="text-success">
                          <i className="bi bi-arrow-up"></i>
                          18% this month
                        </small>
                      </div>
                      <div className="bg-danger bg-opacity-10 rounded-circle p-3">
                        <i className="bi bi-currency-rupee fs-3 text-danger"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Middle Section */}
            <div className="row g-4 mb-4">
              {/* Sales Overview */}
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h5 className="fw-bold mb-1">
                          Sales Overview
                        </h5>
                        <p className="text-muted mb-0">
                          Monthly revenue performance
                        </p>
                      </div>
                      <select className="form-select w-auto">
                        <option>This Year</option>
                        <option>This Month</option>
                        <option>This Week</option>
                      </select>
                    </div>
                    {/* Simple Chart */}
                    <div
                      className="d-flex align-items-end justify-content-between"
                      style={{ height: "250px" }}
                    >
                      <div
                        className="bg-primary rounded-top"
                        style={{ width: "8%", height: "35%" }}
                      ></div>
                      <div
                        className="bg-primary rounded-top"
                        style={{ width: "8%", height: "50%" }}
                      ></div>
                      <div
                        className="bg-primary rounded-top"
                        style={{ width: "8%", height: "42%" }}
                      ></div>
                      <div
                        className="bg-primary rounded-top"
                        style={{ width: "8%", height: "65%" }}
                      ></div>
                      <div
                        className="bg-primary rounded-top"
                        style={{ width: "8%", height: "58%" }}
                      ></div>
                      <div
                        className="bg-primary rounded-top"
                        style={{ width: "8%", height: "78%" }}
                      ></div>
                      <div
                        className="bg-primary rounded-top"
                        style={{ width: "8%", height: "90%" }}
                      ></div>
                      <div
                        className="bg-primary rounded-top"
                        style={{ width: "8%", height: "72%" }}
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between text-muted small mt-2">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Order Status */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-4">
                      Order Status
                    </h5>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <span>
                          Delivered
                        </span>
                        <strong className="text-success">
                          82
                        </strong>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-success"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <span>
                          Shipped
                        </span>
                        <strong className="text-primary">
                          35
                        </strong>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <span>
                          Pending
                        </span>
                        <strong className="text-warning">
                          25
                        </strong>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-warning"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>
                          Cancelled
                        </span>
                        <strong className="text-danger">
                          14
                        </strong>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-danger"
                          style={{ width: "18%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Recent Orders */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1">
                      Recent Orders
                    </h5>
                    <p className="text-muted mb-0">
                      Latest customer orders
                    </p>
                  </div>
                  <a
                    href="/admin/orders"
                    className="btn btn-outline-primary btn-sm"
                  >
                    View All
                  </a>
                </div>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>#ORD001</strong>
                        </td>
                        <td>
                          Rahul
                        </td>
                        <td>
                          25 Aug 2026
                        </td>
                        <td>
                          ₹2,499
                        </td>
                        <td>
                          <span className="badge bg-success">
                            Delivered
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>#ORD002</strong>
                        </td>
                        <td>
                          Aman
                        </td>
                        <td>
                          25 Aug 2026
                        </td>
                        <td>
                          ₹4,999
                        </td>
                        <td>
                          <span className="badge bg-warning text-dark">
                            Pending
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>#ORD003</strong>
                        </td>
                        <td>
                          Priya
                        </td>
                        <td>
                          24 Aug 2026
                        </td>
                        <td>
                          ₹1,999
                        </td>
                        <td>
                          <span className="badge bg-primary">
                            Shipped
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;