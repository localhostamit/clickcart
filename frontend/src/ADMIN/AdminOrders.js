import { useEffect, useState } from "react";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import API_URL from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all orders for admin
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/orders/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to fetch orders."
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Fetch orders error:", error);
      setError(
        error.message || "Unable to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message ||
            "Failed to update order status."
        );
        return;
      }

      // Update order in frontend
      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );

      // Update selected order if modal is open
      setSelectedOrder((previousOrder) => {
        if (
          previousOrder &&
          previousOrder._id === orderId
        ) {
          return {
            ...previousOrder,
            status: newStatus,
          };
        }

        return previousOrder;
      });
    } catch (error) {
      console.error(
        "Update order status error:",
        error
      );

      alert("Unable to connect to server.");
    }
  };

  // Status class
  const getStatusClass = (status) => {
    const normalizedStatus =
      status?.toLowerCase();

    if (normalizedStatus === "delivered") {
      return "bg-success";
    }

    if (normalizedStatus === "pending") {
      return "bg-warning text-dark";
    }

    if (normalizedStatus === "processing") {
      return "bg-info text-dark";
    }

    if (normalizedStatus === "shipped") {
      return "bg-primary";
    }

    if (normalizedStatus === "cancelled") {
      return "bg-danger";
    }

    return "bg-secondary";
  };

  // Format status for display
  const formatStatus = (status) => {
    if (!status) {
      return "Unknown";
    }

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    );
  };

  // Get customer name
  const getCustomerName = (order) => {
    if (order.user?.name) {
      return order.user.name;
    }

    return "Customer";
  };

  // Get customer email
  const getCustomerEmail = (order) => {
    if (order.user?.email) {
      return order.user.email;
    }

    return "—";
  };

  // Get order date
  const getOrderDate = (order) => {
    if (!order.createdAt) {
      return "—";
    }

    return new Date(
      order.createdAt
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Get order amount
  const getOrderAmount = (order) => {
    const amount = Number(
      order.totalPrice || 0
    );

    return `₹${amount.toLocaleString("en-IN")}`;
  };

  // Get product names
  const getProductNames = (order) => {
    if (
      !order.products ||
      order.products.length === 0
    ) {
      return "No products";
    }

    return order.products
      .map((item) => {
        if (item.product?.name) {
          return item.product.name;
        }

        return "Product";
      })
      .join(", ");
  };

  // Search + status filtering
  const filteredOrders = orders.filter(
    (order) => {
      const searchText =
        search.toLowerCase();

      const orderId =
        order._id?.toLowerCase() || "";

      const customer =
        getCustomerName(order).toLowerCase();

      const email =
        getCustomerEmail(order).toLowerCase();

      const products =
        getProductNames(order).toLowerCase();

      const matchesSearch =
        orderId.includes(searchText) ||
        customer.includes(searchText) ||
        email.includes(searchText) ||
        products.includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        order.status ===
          statusFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  // Statistics
  const totalOrders = orders.length;

  const deliveredOrders =
    orders.filter(
      (order) =>
        order.status === "delivered"
    ).length;

  const pendingOrders =
    orders.filter(
      (order) =>
        order.status === "pending"
    ).length;

 
  // Revenue
  const totalRevenue =
    orders.reduce(
      (total, order) =>
        total +
        Number(order.totalPrice || 0),
      0
    );

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
                {loading
                  ? "..."
                  : `${filteredOrders.length} Orders`}
              </span>

            </div>

            {/* Error */}
            {error && (
              <div className="alert alert-danger">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            {/* Statistics */}
            <div className="row g-3 mb-4">

              {/* Total Orders */}
              <div className="col-md-6 col-xl-3">

                <div className="card border-0 shadow-sm">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <div>

                        <p className="text-muted mb-1">
                          Total Orders
                        </p>

                        <h4 className="fw-bold mb-0">
                          {loading
                            ? "..."
                            : totalOrders}
                        </h4>

                      </div>

                      <i className="bi bi-cart-check fs-2 text-primary"></i>

                    </div>

                  </div>

                </div>

              </div>

              {/* Delivered */}
              <div className="col-md-6 col-xl-3">

                <div className="card border-0 shadow-sm">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <div>

                        <p className="text-muted mb-1">
                          Delivered
                        </p>

                        <h4 className="fw-bold mb-0">
                          {loading
                            ? "..."
                            : deliveredOrders}
                        </h4>

                      </div>

                      <i className="bi bi-check-circle fs-2 text-success"></i>

                    </div>

                  </div>

                </div>

              </div>

              {/* Pending */}
              <div className="col-md-6 col-xl-3">

                <div className="card border-0 shadow-sm">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <div>

                        <p className="text-muted mb-1">
                          Pending
                        </p>

                        <h4 className="fw-bold mb-0">
                          {loading
                            ? "..."
                            : pendingOrders}
                        </h4>

                      </div>

                      <i className="bi bi-clock fs-2 text-warning"></i>

                    </div>

                  </div>

                </div>

              </div>

              {/* Revenue */}
              <div className="col-md-6 col-xl-3">

                <div className="card border-0 shadow-sm">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <div>

                        <p className="text-muted mb-1">
                          Revenue
                        </p>

                        <h4 className="fw-bold mb-0">
                          {loading
                            ? "..."
                            : `₹${totalRevenue.toLocaleString(
                                "en-IN"
                              )}`}
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
                          setSearch(
                            e.target.value
                          )
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
                        setStatusFilter(
                          e.target.value
                        )
                      }
                    >

                      <option value="All">
                        All Status
                      </option>

                      <option value="pending">
                        Pending
                      </option>

                      <option value="processing">
                        Processing
                      </option>

                      <option value="shipped">
                        Shipped
                      </option>

                      <option value="delivered">
                        Delivered
                      </option>

                      <option value="cancelled">
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

                {loading ? (

                  <div className="text-center py-5">

                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>

                    <p className="text-muted mt-3 mb-0">
                      Loading orders...
                    </p>

                  </div>

                ) : (

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
                            Status
                          </th>

                          <th>
                            Action
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {filteredOrders.length > 0 ? (

                          filteredOrders.map(
                            (order) => (

                              <tr
                                key={
                                  order._id
                                }
                              >

                                {/* Order ID */}
                                <td className="px-4">

                                  <strong>
                                    #
                                    {order._id
                                      ?.slice(
                                        -6
                                      )
                                      .toUpperCase()}
                                  </strong>

                                </td>

                                {/* Customer */}
                                <td>

                                  <div className="d-flex align-items-center">

                                    <div
                                      className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2"
                                      style={{
                                        width:
                                          "38px",
                                        height:
                                          "38px",
                                      }}
                                    >

                                      <i className="bi bi-person text-primary"></i>

                                    </div>

                                    <div>

                                      <strong>
                                        {getCustomerName(
                                          order
                                        )}
                                      </strong>

                                      <br />

                                      <small className="text-muted">
                                        {getCustomerEmail(
                                          order
                                        )}
                                      </small>

                                    </div>

                                  </div>

                                </td>

                                {/* Date */}
                                <td>
                                  {getOrderDate(
                                    order
                                  )}
                                </td>

                                {/* Product */}
                                <td>

                                  <span
                                    title={getProductNames(
                                      order
                                    )}
                                  >
                                    {getProductNames(
                                      order
                                    ).length >
                                    35
                                      ? `${getProductNames(
                                          order
                                        ).slice(
                                          0,
                                          35
                                        )}...`
                                      : getProductNames(
                                          order
                                        )}
                                  </span>

                                </td>

                                {/* Amount */}
                                <td>

                                  <strong>
                                    {getOrderAmount(
                                      order
                                    )}
                                  </strong>

                                </td>

                                {/* Status */}
                                <td>

                                  <select
                                    className={`form-select form-select-sm ${getStatusClass(
                                      order.status
                                    )}`}
                                    value={
                                      order.status
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      handleStatusChange(
                                        order._id,
                                        e.target
                                          .value
                                      )
                                    }
                                    style={{
                                      width:
                                        "125px",
                                    }}
                                  >

                                    <option value="pending">
                                      Pending
                                    </option>

                                    <option value="processing">
                                      Processing
                                    </option>

                                    <option value="shipped">
                                      Shipped
                                    </option>

                                    <option value="delivered">
                                      Delivered
                                    </option>

                                    <option value="cancelled">
                                      Cancelled
                                    </option>

                                  </select>

                                </td>

                                {/* Action */}
                                <td>

                                  <button
                                    onClick={() =>
                                      setSelectedOrder(
                                        order
                                      )
                                    }
                                    className="btn btn-sm btn-outline-primary"
                                    title="View Order"
                                  >

                                    <i className="bi bi-eye"></i>

                                  </button>

                                </td>

                              </tr>

                            )
                          )

                        ) : (

                          <tr>

                            <td
                              colSpan="7"
                              className="text-center py-5"
                            >

                              <i className="bi bi-search fs-1 text-muted"></i>

                              <h5 className="mt-3">
                                No Orders Found
                              </h5>

                              <p className="text-muted mb-0">
                                Try changing your
                                search or filter.
                              </p>

                            </td>

                          </tr>

                        )}

                      </tbody>

                    </table>

                  </div>

                )}

              </div>

              {/* Footer */}
              <div className="card-footer bg-white border-0">

                <small className="text-muted">
                  Showing{" "}
                  {filteredOrders.length}{" "}
                  of {orders.length} orders
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
            backgroundColor:
              "rgba(0,0,0,0.5)",
          }}
        >

          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content">

              {/* Modal Header */}
              <div className="modal-header">

                <h5 className="modal-title fw-bold">
                  Order Details
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setSelectedOrder(
                      null
                    )
                  }
                ></button>

              </div>

              {/* Modal Body */}
              <div className="modal-body">

                <div className="d-flex justify-content-between mb-3">

                  <strong>
                    Order ID
                  </strong>

                  <span>
                    #
                    {selectedOrder._id
                      ?.slice(-6)
                      .toUpperCase()}
                  </span>

                </div>

                <div className="d-flex justify-content-between mb-3">

                  <strong>
                    Customer
                  </strong>

                  <span>
                    {getCustomerName(
                      selectedOrder
                    )}
                  </span>

                </div>

                <div className="mb-3">

                  <strong>
                    Email
                  </strong>

                  <div className="text-muted">
                    {getCustomerEmail(
                      selectedOrder
                    )}
                  </div>

                </div>

                <div className="mb-3">

                  <strong>
                    Products
                  </strong>

                  <div className="mt-2">

                    {selectedOrder.products?.map(
                      (item, index) => (

                        <div
                          key={index}
                          className="d-flex justify-content-between border-bottom py-2"
                        >

                          <span>
                            {item.product?.name ||
                              "Product"}
                            {" × "}
                            {item.quantity}
                          </span>

                          <strong>
                            ₹
                            {(
                              Number(
                                item.product
                                  ?.price || 0
                              ) *
                              Number(
                                item.quantity ||
                                  0
                              )
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>

                        </div>

                      )
                    )}

                  </div>

                </div>

                <div className="d-flex justify-content-between mb-3">

                  <strong>
                    Date
                  </strong>

                  <span>
                    {getOrderDate(
                      selectedOrder
                    )}
                  </span>

                </div>

                <div className="d-flex justify-content-between mb-3">

                  <strong>
                    Amount
                  </strong>

                  <strong>
                    {getOrderAmount(
                      selectedOrder
                    )}
                  </strong>

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
                    {formatStatus(
                      selectedOrder.status
                    )}
                  </span>

                </div>

              </div>

              {/* Modal Footer */}
              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setSelectedOrder(
                      null
                    )
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