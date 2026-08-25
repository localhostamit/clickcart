import AdminSidebar from "../Components/Admin/AdminSidebar";
function AdminOrders() {
  const orders = [
    {
      id: "#ORD001",
      customer: "Rahul",
      date: "24 Aug 2026",
      amount: 2499,
      status: "Delivered",
    },
    {
      id: "#ORD002",
      customer: "Aman",
      date: "24 Aug 2026",
      amount: 4999,
      status: "Pending",
    },
    {
      id: "#ORD003",
      customer: "Priya",
      date: "23 Aug 2026",
      amount: 1999,
      status: "Shipped",
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
        <div className="col-lg-10">
          <div className="p-4">
            <h2 className="fw-bold mb-1">
              Orders
            </h2>
            <p className="text-muted mb-4">
              Manage customer orders
            </p>
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <strong>
                              {order.id}
                            </strong>
                          </td>
                          <td>
                            {order.customer}
                          </td>
                          <td>
                            {order.date}
                          </td>
                          <td>
                            ₹{order.amount}
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                order.status === "Delivered"
                                  ? "bg-success"
                                  : order.status === "Pending"
                                  ? "bg-warning text-dark"
                                  : "bg-primary"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary">
                              <i className="bi bi-eye"></i>
                            </button>
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
export default AdminOrders;