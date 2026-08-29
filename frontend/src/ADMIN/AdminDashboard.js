import { Link } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar";
function AdminDashboard() {
  const stats = [
    {
      title: "Total Products",
      value: "32",
      change: "12% this month",
      icon: "bi-box-seam",
      color: "primary",
    },
    {
      title: "Total Orders",
      value: "156",
      change: "8% this month",
      icon: "bi-cart-check",
      color: "success",
    },
    {
      title: "Total Users",
      value: "1,248",
      change: "15% this month",
      icon: "bi-people",
      color: "warning",
    },
    {
      title: "Total Revenue",
      value: "₹2,45,890",
      change: "18% this month",
      icon: "bi-currency-rupee",
      color: "danger",
    },
  ];
  const sales = [
    { month: "Jan", value: 35 },
    { month: "Feb", value: 50 },
    { month: "Mar", value: 42 },
    { month: "Apr", value: 65 },
    { month: "May", value: 58 },
    { month: "Jun", value: 78 },
    { month: "Jul", value: 90 },
    { month: "Aug", value: 72 },
  ];
  const orderStatus = [
    {
      name: "Delivered",
      count: 82,
      width: "70%",
      color: "success",
    },
    {
      name: "Shipped",
      count: 35,
      width: "45%",
      color: "primary",
    },
    {
      name: "Pending",
      count: 25,
      width: "30%",
      color: "warning",
    },
    {
      name: "Cancelled",
      count: 14,
      width: "18%",
      color: "danger",
    },
  ];
  const topProducts = [
    {
      name: "Apple MacBook Air",
      category: "Electronics",
      sales: 45,
      price: "₹89,999",
      icon: "bi-laptop",
    },
    {
      name: "Nike Sneakers",
      category: "Fashion",
      sales: 38,
      price: "₹4,999",
      icon: "bi-bag",
    },
    {
      name: "Sony Headphones",
      category: "Electronics",
      sales: 31,
      price: "₹3,499",
      icon: "bi-headphones",
    },
    {
      name: "Puma Shoes",
      category: "Fashion",
      sales: 27,
      price: "₹3,999",
      icon: "bi-bag-check",
    },
  ];
  const recentOrders = [
    {
      id: "#ORD001",
      customer: "Rahul",
      date: "25 Aug 2026",
      amount: "₹2,499",
      status: "Delivered",
    },
    {
      id: "#ORD002",
      customer: "Aman",
      date: "25 Aug 2026",
      amount: "₹4,999",
      status: "Pending",
    },
    {
      id: "#ORD003",
      customer: "Priya",
      date: "24 Aug 2026",
      amount: "₹1,999",
      status: "Shipped",
    },
    {
      id: "#ORD004",
      customer: "Neha",
      date: "24 Aug 2026",
      amount: "₹3,299",
      status: "Pending",
    },
  ];
  const getStatusClass = (status) => {
    if (status === "Delivered") {
      return "bg-success";
    }
    if (status === "Pending") {
      return "bg-warning text-dark";
    }
    if (status === "Shipped") {
      return "bg-primary";
    }
    return "bg-danger";
  };
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
              <span className="badge bg-success p-2">
                <i className="bi bi-circle-fill me-2"></i>
                System Online
              </span>
            </div>
            {/* Statistics */}
            <div className="row g-4 mb-4">
              {stats.map((stat) => (
                <div
                  className="col-md-6 col-xl-3"
                  key={stat.title}
                >
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted mb-2">
                            {stat.title}
                          </p>
                          <h3 className="fw-bold mb-1">
                            {stat.value}
                          </h3>
                          <small className="text-success">
                            <i className="bi bi-arrow-up me-1"></i>
                            {stat.change}
                          </small>
                        </div>
                        <div
                          className={`bg-${stat.color} bg-opacity-10 rounded-circle p-3`}
                        >
                          <i
                            className={`bi ${stat.icon} fs-3 text-${stat.color}`}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Sales + Order Status */}
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
                        <option>
                          This Year
                        </option>
                        <option>
                          This Month
                        </option>
                        <option>
                          This Week
                        </option>
                      </select>
                    </div>
                    {/* Chart */}
                    <div
                      className="d-flex align-items-end justify-content-between gap-2"
                      style={{ height: "250px" }}
                    >
                      {sales.map((item) => (
                        <div
                          key={item.month}
                          className="d-flex flex-column align-items-center justify-content-end"
                          style={{
                            width: "11%",
                            height: "100%",
                          }}
                        >
                          <small className="text-muted mb-2">
                            {item.value}%
                          </small>
                          <div
                            className="bg-primary rounded-top w-100"
                            style={{
                              height: `${item.value}%`,
                              minHeight: "10px",
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    {/* Months */}
                    <div className="d-flex justify-content-between text-muted small mt-2">
                      {sales.map((item) => (
                        <span key={item.month}>
                          {item.month}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Order Status */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="fw-bold mb-0">
                        Order Status
                      </h5>
                      <Link
                        to="/admin/orders"
                        className="text-decoration-none small"
                      >
                        View Orders
                      </Link>
                    </div>
                    {orderStatus.map((order) => (
                      <div
                        className="mb-4"
                        key={order.name}
                      >
                        <div className="d-flex justify-content-between mb-2">
                          <span>
                            {order.name}
                          </span>
                          <strong
                            className={`text-${order.color}`}
                          >
                            {order.count}
                          </strong>
                        </div>
                        <div
                          className="progress"
                          style={{ height: "7px" }}
                        >
                          <div
                            className={`progress-bar bg-${order.color}`}
                            style={{
                              width: order.width,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Top Products */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1">
                      Top Selling Products
                    </h5>
                    <p className="text-muted mb-0">
                      Best performing products
                    </p>
                  </div>
                  <Link
                    to="/admin/products"
                    className="btn btn-outline-primary btn-sm"
                  >
                    View All
                  </Link>
                </div>
                <div className="row g-3">
                  {topProducts.map((product) => (
                    <div
                      className="col-md-6 col-xl-3"
                      key={product.name}
                    >
                      <div className="border rounded p-3 h-100">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary bg-opacity-10 rounded p-3 me-3">
                            <i
                              className={`bi ${product.icon} fs-4 text-primary`}
                            ></i>
                          </div>
                          <div>
                            <h6 className="fw-bold mb-1">
                              {product.name}
                            </h6>
                            <small className="text-muted">
                              {product.category}
                            </small>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">
                            Sold
                          </span>
                          <strong>
                            {product.sales}
                          </strong>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <span className="text-muted">
                            Price
                          </span>
                          <strong className="text-primary">
                            {product.price}
                          </strong>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  <Link
                    to="/admin/orders"
                    className="btn btn-outline-primary btn-sm"
                  >
                    View All
                  </Link>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>
                          Order ID
                        </th>
                        <th>
                          Customer
                        </th>
                        <th>
                          Date
                        </th>
                        <th>
                          Amount
                        </th>
                        <th>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <strong>
                              {order.id}
                            </strong>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div
                                className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2"
                                style={{
                                  width: "35px",
                                  height: "35px",
                                }}
                              >
                                <i className="bi bi-person text-primary"></i>
                              </div>
                              {order.customer}
                            </div>
                          </td>
                          <td>
                            {order.date}
                          </td>
                          <td>
                            <strong>
                              {order.amount}
                            </strong>
                          </td>
                          <td>
                            <span
                              className={`badge ${getStatusClass(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
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
      </div>
    </div>
  );
}
export default AdminDashboard;