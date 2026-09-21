import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import API_URL from "../services/api";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  const totalProducts = products.length;
  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

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

  const getOrderCustomer = (order) => {
    if (order.user?.name) {
      return order.user.name;
    }

    return "Customer";
  };

  const getOrderAmount = (order) => {
    if (order.totalAmount !== undefined) {
      return `₹${order.totalAmount}`;
    }

    if (order.total !== undefined) {
      return `₹${order.total}`;
    }

    return "—";
  };

  const getOrderDate = (order) => {
    if (order.createdAt) {
      return new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }

    return "—";
  };

  const stats = [
    {
      title: "Total Products",
      value: loadingProducts ? "..." : totalProducts,
      change: "From database",
      icon: "bi-box-seam",
      color: "primary",
    },
    {
      title: "Total Orders",
      value: loadingOrders ? "..." : totalOrders,
      change: "From orders",
      icon: "bi-cart-check",
      color: "success",
    },
    {
      title: "Total Users",
      value: "Coming Soon",
      change: "Feature coming soon",
      icon: "bi-people",
      color: "warning",
    },
    {
      title: "Total Revenue",
      value: "Coming Soon",
      change: "Feature coming soon",
      icon: "bi-currency-rupee",
      color: "danger",
    },
  ];

  const orderStatus = [
    {
      name: "Delivered",
      count: deliveredOrders,
      color: "success",
    },
    {
      name: "Shipped",
      count: shippedOrders,
      color: "primary",
    },
    {
      name: "Pending",
      count: pendingOrders,
      color: "warning",
    },
    {
      name: "Cancelled",
      count: cancelledOrders,
      color: "danger",
    },
  ];

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

                          <small className="text-muted">
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

            {/* Sales Overview + Order Status */}
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
                          Revenue analytics
                        </p>
                      </div>

                      <span className="badge bg-secondary">
                        Coming Soon
                      </span>
                    </div>

                    <div
                      className="d-flex flex-column align-items-center justify-content-center text-center"
                      style={{ height: "250px" }}
                    >
                      <i className="bi bi-bar-chart-line fs-1 text-muted mb-3"></i>

                      <h5 className="text-muted">
                        Sales analytics coming soon
                      </h5>

                      <p className="text-muted mb-0">
                        Revenue and monthly sales data will appear here.
                      </p>
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
                            {loadingOrders ? "..." : order.count}
                          </strong>
                        </div>

                        <div
                          className="progress"
                          style={{ height: "7px" }}
                        >
                          <div
                            className={`progress-bar bg-${order.color}`}
                            style={{
                              width:
                                totalOrders > 0
                                  ? `${(order.count / totalOrders) * 100}%`
                                  : "0%",
                            }}
                          ></div>
                        </div>

                      </div>
                    ))}

                  </div>
                </div>
              </div>

            </div>

            {/* All Products */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <div>
                    <h5 className="fw-bold mb-1">
                      All Products
                    </h5>

                    <p className="text-muted mb-0">
                      Products currently available in ClickCart
                    </p>
                  </div>

                  <Link
                    to="/admin/products"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Manage Products
                  </Link>

                </div>

                {loadingProducts ? (
                  <div className="text-center py-4">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-4">
                    <i className="bi bi-box-seam fs-1 text-muted"></i>
                    <p className="text-muted mt-2">
                      No products found.
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">

                      <thead className="table-light">
                        <tr>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stock</th>
                        </tr>
                      </thead>

                      <tbody>
                        {products.map((product) => (
                          <tr key={product._id}>

                            <td>
                              <div className="d-flex align-items-center">

                                {product.image ? (
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="rounded me-3"
                                    style={{
                                      width: "45px",
                                      height: "45px",
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : (
                                  <div
                                    className="bg-primary bg-opacity-10 rounded d-flex align-items-center justify-content-center me-3"
                                    style={{
                                      width: "45px",
                                      height: "45px",
                                    }}
                                  >
                                    <i className="bi bi-box text-primary"></i>
                                  </div>
                                )}

                                <strong>
                                  {product.name}
                                </strong>

                              </div>
                            </td>

                            <td>
                              {product.category?.name || "—"}
                            </td>

                            <td>
                              <strong>
                                ₹{product.price}
                              </strong>
                            </td>

                            <td>
                              <span
                                className={
                                  product.stock > 0
                                    ? "badge bg-success"
                                    : "badge bg-danger"
                                }
                              >
                                {product.stock > 0
                                  ? `${product.stock} available`
                                  : "Out of stock"}
                              </span>
                            </td>

                          </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>
                )}

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

                {loadingOrders ? (
                  <div className="text-center py-4">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-4">
                    <i className="bi bi-cart-x fs-1 text-muted"></i>
                    <p className="text-muted mt-2">
                      No orders found.
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                      <thead className="table-light">
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order._id}>

                            <td>
                              <strong>
                                #{order._id.slice(-6).toUpperCase()}
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

                                {getOrderCustomer(order)}

                              </div>
                            </td>

                            <td>
                              {getOrderDate(order)}
                            </td>

                            <td>
                              <strong>
                                {getOrderAmount(order)}
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
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;