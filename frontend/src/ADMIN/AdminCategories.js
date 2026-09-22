import { useEffect, useState } from "react";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import API_URL from "../services/api";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // FETCH CATEGORIES
  // =========================
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/categories`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch categories");
      }

      // Support both:
      // { categories: [...] }
      // and direct [...]
      setCategories(data.categories || data || []);
    } catch (error) {
      console.error("Fetch categories error:", error);
      setError(error.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // =========================
  // SEARCH
  // =========================
  const filteredCategories = categories.filter((category) =>
    category.name?.toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // ADD CATEGORY
  // =========================
  const handleAdd = () => {
    setEditingCategory(null);
    setCategoryName("");
    setError("");
    setShowModal(true);
  };

  // =========================
  // EDIT CATEGORY
  // =========================
  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setError("");
    setShowModal(true);
  };

  // =========================
  // SAVE CATEGORY
  // =========================
  const handleSave = async () => {
    if (!categoryName.trim()) {
      alert("Please enter category name.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const token = localStorage.getItem("token");

      const url = editingCategory
        ? `${API_URL}/api/categories/${editingCategory._id}`
        : `${API_URL}/api/categories`;

      const method = editingCategory ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: categoryName.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save category");
      }

      setShowModal(false);
      setCategoryName("");
      setEditingCategory(null);

      // Refresh categories from database
      await fetchCategories();
    } catch (error) {
      console.error("Save category error:", error);
      setError(error.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE CATEGORY
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete category");
      }

      // Refresh from database
      await fetchCategories();
    } catch (error) {
      console.error("Delete category error:", error);
      setError(error.message || "Failed to delete category");
    }
  };

  // =========================
  // STATISTICS
  // =========================
  const activeCategories = categories.length;

  const totalProducts = categories.reduce((total, category) => {
    return total + (category.productsCount || category.products || 0);
  }, 0);

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

            {/* Error */}
            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

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
                    onChange={(e) => setSearch(e.target.value)}
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
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {loading ? (

                        <tr>
                          <td
                            colSpan="4"
                            className="text-center py-5"
                          >
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            ></div>

                            <p className="text-muted mt-3 mb-0">
                              Loading categories...
                            </p>
                          </td>
                        </tr>

                      ) : filteredCategories.length > 0 ? (

                        filteredCategories.map((category, index) => (

                          <tr key={category._id}>

                            <td className="px-4">
                              #{index + 1}
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

                                {category.productsCount ||
                                  category.products ||
                                  0}{" "}
                                Products

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

                              {/* Delete */}
                              <button
                                onClick={() =>
                                  handleDelete(category._id)
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
                            colSpan="4"
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

              {/* Header */}
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
                  disabled={saving}
                ></button>

              </div>

              {/* Body */}
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
                  disabled={saving}
                />

              </div>

              {/* Footer */}
              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={saving}
                >

                  {saving ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>

                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg me-2"></i>

                      {editingCategory
                        ? "Update Category"
                        : "Add Category"}
                    </>
                  )}

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