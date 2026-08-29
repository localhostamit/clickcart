import { useState } from "react";
import AdminSidebar from "../Components/Admin/AdminSidebar";
function AdminCategories() {
  const [categories, setCategories] = useState([
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
  ]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleAdd = () => {
    setEditingCategory(null);
    setCategoryName("");
    setShowModal(true);
  };
  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setShowModal(true);
  };
  const handleSave = () => {
    if (!categoryName.trim()) {
      alert("Please enter category name.");
      return;
    }
    if (editingCategory) {
      setCategories((items) =>
        items.map((category) =>
          category.id === editingCategory.id
            ? {
                ...category,
                name: categoryName.trim(),
              }
            : category
        )
      );
    } else {
      const newCategory = {
        id:
          categories.length > 0
            ? Math.max(...categories.map((item) => item.id)) + 1
            : 1,
        name: categoryName.trim(),
        products: 0,
        status: "Active",
      };
      setCategories((items) => [...items, newCategory]);
    }
    setShowModal(false);
    setCategoryName("");
    setEditingCategory(null);
  };
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) {
      return;
    }
    setCategories((items) =>
      items.filter((category) => category.id !== id)
    );
  };
  const handleToggleStatus = (id) => {
    setCategories((items) =>
      items.map((category) =>
        category.id === id
          ? {
              ...category,
              status:
                category.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : category
      )
    );
  };
  const activeCategories = categories.filter(
    (category) => category.status === "Active"
  ).length;
  const totalProducts = categories.reduce(
    (total, category) => total + category.products,
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
                  Categories
                </h2>
                <p className="text-muted mb-0">
                  Manage product categories
                </p>
              </div>
              <button
                onClick={handleAdd}
                className="btn btn-primary"
              >
                <i className="bi bi-plus-lg me-2"></i>
                Add Category
              </button>
            </div>
            {/* Statistics */}
            <div className="row g-3 mb-4">
              {/* Total Categories */}
              <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-muted mb-1">
                          Total Categories
                        </p>
                        <h4 className="fw-bold mb-0">
                          {categories.length}
                        </h4>
                      </div>
                      <i className="bi bi-grid fs-2 text-primary"></i>
                    </div>
                  </div>
                </div>
              </div>
              {/* Active Categories */}
              <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-muted mb-1">
                          Active Categories
                        </p>
                        <h4 className="fw-bold mb-0">
                          {activeCategories}
                        </h4>
                      </div>
                      <i className="bi bi-check-circle fs-2 text-success"></i>
                    </div>
                  </div>
                </div>
              </div>
              {/* Products */}
              <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-muted mb-1">
                          Total Products
                        </p>
                        <h4 className="fw-bold mb-0">
                          {totalProducts}
                        </h4>
                      </div>
                      <i className="bi bi-box-seam fs-2 text-warning"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Search */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search category..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            {/* Categories Table */}
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
                          Category
                        </th>
                        <th>
                          Products
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
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                          <tr key={category.id}>
                            <td className="px-4">
                              #{category.id}
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                                  style={{
                                    width: "42px",
                                    height: "42px",
                                  }}
                                >
                                  <i className="bi bi-grid text-primary"></i>
                                </div>
                                <strong>
                                  {category.name}
                                </strong>
                              </div>
                            </td>
                            <td>
                              <span className="badge bg-light text-dark border">
                                {category.products} Products
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  category.status === "Active"
                                    ? "bg-success"
                                    : "bg-secondary"
                                }`}
                              >
                                {category.status}
                              </span>
                            </td>
                            <td>
                              {/* Edit */}
                              <button
                                onClick={() =>
                                  handleEdit(category)
                                }
                                className="btn btn-sm btn-outline-primary me-2"
                                title="Edit Category"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              {/* Status */}
                              <button
                                onClick={() =>
                                  handleToggleStatus(
                                    category.id
                                  )
                                }
                                className={`btn btn-sm ${
                                  category.status === "Active"
                                    ? "btn-outline-warning"
                                    : "btn-outline-success"
                                } me-2`}
                                title={
                                  category.status === "Active"
                                    ? "Deactivate"
                                    : "Activate"
                                }
                              >
                                <i
                                  className={`bi ${
                                    category.status === "Active"
                                      ? "bi-pause-circle"
                                      : "bi-play-circle"
                                  }`}
                                ></i>
                              </button>
                              {/* Delete */}
                              <button
                                onClick={() =>
                                  handleDelete(category.id)
                                }
                                className="btn btn-sm btn-outline-danger"
                                title="Delete Category"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center py-5"
                          >
                            <i className="bi bi-grid fs-1 text-muted"></i>
                            <h5 className="mt-3">
                              No Categories Found
                            </h5>
                            <p className="text-muted mb-0">
                              Try changing your search.
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
                  Showing {filteredCategories.length} of{" "}
                  {categories.length} categories
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add / Edit Modal */}
      {showModal && (
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
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <label className="form-label fw-semibold">
                  Category Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) =>
                    setCategoryName(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSave();
                    }
                  }}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  <i className="bi bi-check-lg me-2"></i>
                  {editingCategory
                    ? "Update Category"
                    : "Add Category"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminCategories;