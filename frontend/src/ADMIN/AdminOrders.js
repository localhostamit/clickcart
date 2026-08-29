import { useState } from "react";
import AdminSidebar from "../Components/Admin/AdminSidebar";
function AdminOrders() {
  const [orders] = useState([
    {
      id: "#ORD001",
      customer: "Rahul",
      date: "24 Aug 2026",
      amount: 2499,
      products: "Nike Sneakers",
      payment: "Paid",
      status: "Delivered",
    },
    {
      id: "#ORD002",
      customer: "Aman",
      date: "24 Aug 2026",
      amount: 4999,
      products: "Sony Headphones",
      payment: "Paid",
      status: "Pending",
    },
    {
      id: "#ORD003",
      customer: "Priya",
      date: "23 Aug 2026",
      amount: 1999,
      products: "Puma Shoes",
      payment: "Paid",
      status: "Shipped",
    },
    {
      id: "#ORD004",
      customer: "Neha",
      date: "22 Aug 2026",
      amount: 3299,
      products: "Smart Watch",
      payment: "Pending",
      status: "Pending",
    },
    {
      id: "#ORD005",
      customer: "Rohit",
      date: "21 Aug 2026",
      amount: 7999,
      products: "Bluetooth Speaker",
      payment: "Paid",
      status: "Delivered",
    },
  ]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(searchText) ||
      order.customer.toLowerCase().includes(searchText) ||
      order.products.toLowerCase().includes(searchText);
    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
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
    if (status === "Cancelled") {
      return "bg-danger";
    }
    return "bg-secondary";
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
                  Orders
                </h2>
                <p className="text-muted mb-0">
                  Manage customer orders
                </p>
              </div>
              <span className="badge bg-primary fs-6 p-2">
                {filteredOrders.length} Orders
              </span>
            </div>
            {/* Statistics */}
            <div className="row g-3 mb-4">
              <div className="col-md-6 col-xl-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-muted mb-1">
                          Total Orders
                        </p>
                        <h4 className="fw-bold mb-0">
                          {orders.length}
                        </h4>
                      </div>
                      <i className="bi bi-cart-check fs-2 text-primary"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-muted mb-1">
                          Delivered
                        </p>
                        <h4 className="fw-bold mb-0">
                          {
                            orders.filter(
                              (order) =>
                                order.status === "Delivered"
                            ).length
                          }
                        </h4>
                      </div>
                      <i className="bi bi-check-circle fs-2 text-success"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-muted mb-1">
                          Pending
                        </p>
                        <h4 className="fw-bold mb-0">
                          {
                            orders.filter(
                              (order) =>
                                order.status === "Pending"
                            ).length
                          }
                        </h4>
                      </div>
                      <i className="bi bi-clock fs-2 text-warning"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-muted mb-1">
                          Revenue
                        </p>
                        <h4 className="fw-bold mb-0">
                          ₹
                          {orders
                            .reduce(
                              (total, order) =>
                                total + order.amount,
                              0
                            )
                            .toLocaleString("en-IN")}
                        </h4>
                      </div>
                      <i className="bi bi-currency-rupee fs-2 text-danger"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Search & Filter */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="row g-3">
                  {/* Search */}
                  <div className="col-md-8">
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search order, customer or product..."
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  {/* Status Filter */}
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(e.target.value)
                      }
                    >
                      <option value="All">
                        All Status
                      </option>
                      <option value="Pending">
                        Pending
                      </option>
                      <option value="Shipped">
                        Shipped
                      </option>
                      <option value="Delivered">
                        Delivered
                      </option>
                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* Orders Table */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="px-4">
                          Order ID
                        </th>
                        <th>
                          Customer
                        </th>
                        <th>
                          Date
                        </th>
                        <th>
                          Product
                        </th>
                        <th>
                          Amount
                        </th>
                        <th>
                          Payment
                        </th>
                        <th>
                          Status
                        </th>
                        <th>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-4">
                              <strong>
                                {order.id}
                              </strong>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2"
                                  style={{
                                    width: "38px",
                                    height: "38px",
                                  }}
                                >
                                  <i className="bi bi-person text-primary"></i>
                                </div>
                                <strong>
                                  {order.customer}
                                </strong>
                              </div>
                            </td>
                            <td>
                              {order.date}
                            </td>
                            <td>
                              {order.products}
                            </td>
                            <td>
                              <strong>
                                ₹
                                {order.amount.toLocaleString(
                                  "en-IN"
                                )}
                              </strong>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  order.payment === "Paid"
                                    ? "bg-success"
                                    : "bg-warning text-dark"
                                }`}
                              >
                                {order.payment}
                              </span>
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
                            <td>
                              <button
                                onClick={() =>
                                  setSelectedOrder(order)
                                }
                                className="btn btn-sm btn-outline-primary"
                                title="View Order"
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="8"
                            className="text-center py-5"
                          >
                            <i className="bi bi-search fs-1 text-muted"></i>
                            <h5 className="mt-3">
                              No Orders Found
                            </h5>
                            <p className="text-muted mb-0">
                              Try changing your search or filter.
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Footer */}
              <div className="card-footer bg-white border-0">
                <small className="text-muted">
                  Showing {filteredOrders.length} of{" "}
                  {orders.length} orders
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  Order Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setSelectedOrder(null)
                  }
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex justify-content-between mb-3">
                  <strong>
                    Order ID
                  </strong>
                  <span>
                    {selectedOrder.id}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <strong>
                    Customer
                  </strong>
                  <span>
                    {selectedOrder.customer}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <strong>
                    Product
                  </strong>
                  <span>
                    {selectedOrder.products}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <strong>
                    Date
                  </strong>
                  <span>
                    {selectedOrder.date}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <strong>
                    Amount
                  </strong>
                  <strong>
                    ₹
                    {selectedOrder.amount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <strong>
                    Payment
                  </strong>
                  <span
                    className={`badge ${
                      selectedOrder.payment === "Paid"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {selectedOrder.payment}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>
                    Status
                  </strong>
                  <span
                    className={`badge ${getStatusClass(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setSelectedOrder(null)
                  }
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminOrders;