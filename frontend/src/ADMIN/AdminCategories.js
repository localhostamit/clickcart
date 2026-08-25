import AdminSidebar from "../Components/Admin/AdminSidebar";
function AdminCategories() {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      products: 10,
      status: "Active",
    },
    {
      id: 2,
      name: "Fashion",
      products: 8,
      status: "Active",
    },
    {
      id: 3,
      name: "Shoes",
      products: 7,
      status: "Active",
    },
    {
      id: 4,
      name: "Beauty",
      products: 7,
      status: "Active",
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
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold mb-1">
                  Categories
                </h2>
                <p className="text-muted mb-0">
                  Manage product categories
                </p>
              </div>
              <button className="btn btn-primary">
                <i className="bi bi-plus-lg me-2"></i>
                Add Category
              </button>
            </div>
            {/* Categories Table */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Products</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td>
                            {category.id}
                          </td>
                          <td>
                            <strong>
                              {category.name}
                            </strong>
                          </td>
                          <td>
                            {category.products}
                          </td>
                          <td>
                            <span className="badge bg-success">
                              {category.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2">
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="bi bi-trash"></i>
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
export default AdminCategories;