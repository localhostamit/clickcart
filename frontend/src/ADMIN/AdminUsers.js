import AdminSidebar from "../Components/Admin/AdminSidebar";
function AdminUsers() {
  const users = [
    {
      id: 1,
      name: "Rahul",
      email: "rahul@example.com",
      phone: "9876543210",
      status: "Active",
    },
    {
      id: 2,
      name: "Aman",
      email: "aman@example.com",
      phone: "9876543211",
      status: "Active",
    },
    {
      id: 3,
      name: "Priya",
      email: "priya@example.com",
      phone: "9876543212",
      status: "Blocked",
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
              Users
            </h2>
            <p className="text-muted mb-4">
              Manage registered customers
            </p>
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>
                            {user.id}
                          </td>
                          <td>
                            <strong>
                              {user.name}
                            </strong>
                          </td>
                          <td>
                            {user.email}
                          </td>
                          <td>
                            {user.phone}
                          </td>
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
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2">
                              <i className="bi bi-eye"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="bi bi-ban"></i>
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
export default AdminUsers;