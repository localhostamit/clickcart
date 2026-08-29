import { useState } from "react";
import AdminSidebar from "../Components/Admin/AdminSidebar";
function AdminUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul",
      email: "rahul@example.com",
      phone: "9876543210",
      status: "Active",
      joined: "20 Aug 2026",
    },
    {
      id: 2,
      name: "Aman",
      email: "aman@example.com",
      phone: "9876543211",
      status: "Active",
      joined: "18 Aug 2026",
    },
    {
      id: 3,
      name: "Priya",
      email: "priya@example.com",
      phone: "9876543212",
      status: "Blocked",
      joined: "15 Aug 2026",
    },
    {
      id: 4,
      name: "Neha",
      email: "neha@example.com",
      phone: "9876543213",
      status: "Active",
      joined: "12 Aug 2026",
    },
    {
      id: 5,
      name: "Rohit",
      email: "rohit@example.com",
      phone: "9876543214",
      status: "Active",
      joined: "10 Aug 2026",
    },
  ]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const handleToggleStatus = (id) => {
    setUsers((items) =>
      items.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Blocked"
                  : "Active",
            }
          : user
      )
    );
  };
  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.phone.includes(searchText);
    const matchesStatus =
      statusFilter === "All" ||
      user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;
  const blockedUsers = users.filter(
    (user) => user.status === "Blocked"
  ).length;
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
                  Users
                </h2>
                <p className="text-muted mb-0">
                  Manage registered customers
                </p>
              </div>
              <span className="badge bg-primary fs-6 p-2">
                {filteredUsers.length} Users
              </span>
            </div>
            {/* Statistics */}
            <div className="row g-3 mb-4">
              {/* Total */}
              <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-muted mb-1">
                          Total Users
                        </p>
                        <h4 className="fw-bold mb-0">
                          {users.length}
                        </h4>
                      </div>
                      <i className="bi bi-people fs-2 text-primary"></i>
                    </div>
                  </div>
                </div>
              </div>
              {/* Active */}
              <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-muted mb-1">
                          Active Users
                        </p>
                        <h4 className="fw-bold mb-0">
                          {activeUsers}
                        </h4>
                      </div>
                      <i className="bi bi-person-check fs-2 text-success"></i>
                    </div>
                  </div>
                </div>
              </div>
              {/* Blocked */}
              <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-muted mb-1">
                          Blocked Users
                        </p>
                        <h4 className="fw-bold mb-0">
                          {blockedUsers}
                        </h4>
                      </div>
                      <i className="bi bi-person-x fs-2 text-danger"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Search & Filter */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-8">
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search name, email or phone..."
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(e.target.value)
                      }
                    >
                      <option value="All">
                        All Users
                      </option>
                      <option value="Active">
                        Active
                      </option>
                      <option value="Blocked">
                        Blocked
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* Users Table */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="px-4">
                          #
                        </th>
                        <th>
                          User
                        </th>
                        <th>
                          Email
                        </th>
                        <th>
                          Phone
                        </th>
                        <th>
                          Joined
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
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td className="px-4">
                              #{user.id}
                            </td>
                            {/* User */}
                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2"
                                  style={{
                                    width: "42px",
                                    height: "42px",
                                  }}
                                >
                                  <i className="bi bi-person text-primary fs-5"></i>
                                </div>
                                <strong>
                                  {user.name}
                                </strong>
                              </div>
                            </td>
                            <td>
                              {user.email}
                            </td>
                            <td>
                              {user.phone}
                            </td>
                            <td>
                              {user.joined}
                            </td>
                            {/* Status */}
                            <td>
                              <span
                                className={`badge ${
                                  user.status === "Active"
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {user.status}
                              </span>
                            </td>
                            {/* Actions */}
                            <td>
                              {/* View */}
                              <button
                                onClick={() =>
                                  setSelectedUser(user)
                                }
                                className="btn btn-sm btn-outline-primary me-2"
                                title="View User"
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              {/* Block / Unblock */}
                              <button
                                onClick={() =>
                                  handleToggleStatus(user.id)
                                }
                                className={`btn btn-sm ${
                                  user.status === "Active"
                                    ? "btn-outline-danger"
                                    : "btn-outline-success"
                                }`}
                                title={
                                  user.status === "Active"
                                    ? "Block User"
                                    : "Unblock User"
                                }
                              >
                                <i
                                  className={`bi ${
                                    user.status === "Active"
                                      ? "bi-ban"
                                      : "bi-check-circle"
                                  }`}
                                ></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="text-center py-5"
                          >
                            <i className="bi bi-person-x fs-1 text-muted"></i>
                            <h5 className="mt-3">
                              No Users Found
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
                  Showing {filteredUsers.length} of{" "}
                  {users.length} users
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* User Details Modal */}
      {selectedUser && (
        <div
          className="modal d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  User Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setSelectedUser(null)
                  }
                ></button>
              </div>
              <div className="modal-body">
                <div className="text-center mb-4">
                  <div
                    className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto"
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  >
                    <i className="bi bi-person fs-1 text-primary"></i>
                  </div>
                  <h5 className="fw-bold mt-3 mb-1">
                    {selectedUser.name}
                  </h5>
                  <span
                    className={`badge ${
                      selectedUser.status === "Active"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {selectedUser.status}
                  </span>
                </div>
                <div className="border rounded p-3">
                  <div className="d-flex justify-content-between mb-3">
                    <strong>
                      Email
                    </strong>
                    <span>
                      {selectedUser.email}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <strong>
                      Phone
                    </strong>
                    <span>
                      {selectedUser.phone}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <strong>
                      Joined
                    </strong>
                    <span>
                      {selectedUser.joined}
                    </span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setSelectedUser(null)
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
export default AdminUsers;