import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import API_URL from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch products.");
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error("Fetch products error:", error);
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Failed to delete product.");
        return;
      }

      // Remove deleted product from UI
      setProducts((items) =>
        items.filter((product) => product._id !== id)
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Delete product error:", error);
      alert("Unable to delete product.");
    }
  };

  // Create category list from actual products
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category?.name || product.category)
        .filter(Boolean)
    ),
  ];

  // Search + category filter
  const filteredProducts = products.filter((product) => {
    const productName = product.name || "";

    const productCategory =
      product.category?.name || product.category || "";

    const matchesSearch = productName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || productCategory === category;

    return matchesSearch && matchesCategory;
  });

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
                  Products
                </h2>

                <p className="text-muted mb-0">
                  Manage your store products
                </p>
              </div>

              <Link
                to="/admin/products/add"
                className="btn btn-primary"
              >
                <i className="bi bi-plus-lg me-2"></i>
                Add Product
              </Link>

            </div>

            {/* Error */}
            {error && (
              <div className="alert alert-danger">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            {/* Stats */}
            <div className="row g-3 mb-4">

              {/* Total Products */}
              <div className="col-md-4">

                <div className="card border-0 shadow-sm">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <div>
                        <p className="text-muted mb-1">
                          Total Products
                        </p>

                        <h4 className="fw-bold mb-0">
                          {loading ? "..." : products.length}
                        </h4>
                      </div>

                      <i className="bi bi-box-seam fs-2 text-primary"></i>

                    </div>

                  </div>

                </div>

              </div>

              {/* Categories */}
              <div className="col-md-4">

                <div className="card border-0 shadow-sm">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <div>
                        <p className="text-muted mb-1">
                          Categories
                        </p>

                        <h4 className="fw-bold mb-0">
                          {loading ? "..." : categories.length - 1}
                        </h4>
                      </div>

                      <i className="bi bi-grid fs-2 text-success"></i>

                    </div>

                  </div>

                </div>

              </div>

              {/* Showing */}
              <div className="col-md-4">

                <div className="card border-0 shadow-sm">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <div>
                        <p className="text-muted mb-1">
                          Showing
                        </p>

                        <h4 className="fw-bold mb-0">
                          {loading ? "..." : filteredProducts.length}
                        </h4>
                      </div>

                      <i className="bi bi-eye fs-2 text-warning"></i>

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
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value)
                        }
                      />

                    </div>

                  </div>

                  {/* Category */}
                  <div className="col-md-4">

                    <select
                      className="form-select"
                      value={category}
                      onChange={(e) =>
                        setCategory(e.target.value)
                      }
                    >

                      {categories.map((item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item === "All"
                            ? "All Categories"
                            : item}
                        </option>
                      ))}

                    </select>

                  </div>

                </div>

              </div>

            </div>

            {/* Product Table */}
            <div className="card border-0 shadow-sm">

              <div className="card-body p-0">

                {loading ? (

                  <div className="text-center py-5">

                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>

                    <p className="text-muted mt-3 mb-0">
                      Loading products...
                    </p>

                  </div>

                ) : (

                  <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                      <thead className="table-light">

                        <tr>

                          <th className="px-4">
                            Image
                          </th>

                          <th>
                            Product
                          </th>

                          <th>
                            Category
                          </th>

                          <th>
                            Price
                          </th>

                          <th>
                            Stock
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

                        {filteredProducts.length > 0 ? (

                          filteredProducts.map((product) => {

                            const productCategory =
                              product.category?.name ||
                              product.category ||
                              "Uncategorized";

                            const stock =
                              Number(product.stock) || 0;

                            return (
                              <tr key={product._id}>

                                {/* Image */}
                                <td className="px-4">

                                  <div
                                    className="bg-light rounded d-flex align-items-center justify-content-center"
                                    style={{
                                      width: "65px",
                                      height: "65px",
                                    }}
                                  >

                                    {product.image ? (

                                      <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                          width: "55px",
                                          height: "55px",
                                          objectFit: "contain",
                                        }}
                                      />

                                    ) : (

                                      <i className="bi bi-box-seam fs-3 text-muted"></i>

                                    )}

                                  </div>

                                </td>

                                {/* Product */}
                                <td>

                                  <strong>
                                    {product.name}
                                  </strong>

                                  <br />

                                  <small className="text-muted">
                                    ID: #
                                    {product._id
                                      ?.slice(-6)
                                      .toUpperCase()}
                                  </small>

                                </td>

                                {/* Category */}
                                <td>

                                  <span className="badge bg-primary">
                                    {productCategory}
                                  </span>

                                </td>

                                {/* Price */}
                                <td>

                                  <strong>
                                    ₹{product.price}
                                  </strong>

                                </td>

                                {/* Stock */}
                                <td>

                                  {stock > 0 ? (

                                    <span className="text-success">
                                      {stock} available
                                    </span>

                                  ) : (

                                    <span className="text-danger">
                                      Out of stock
                                    </span>

                                  )}

                                </td>

                                {/* Status */}
                                <td>

                                  <span
                                    className={
                                      stock > 0
                                        ? "badge bg-success"
                                        : "badge bg-danger"
                                    }
                                  >
                                    {stock > 0
                                      ? "Active"
                                      : "Out of Stock"}
                                  </span>

                                </td>

                                {/* Actions */}
                                <td>

                                  <Link
                                    to={`/admin/products/edit/${product._id}`}
                                    className="btn btn-sm btn-outline-primary me-2"
                                    title="Edit Product"
                                  >
                                    <i className="bi bi-pencil"></i>
                                  </Link>

                                  <button
                                    onClick={() =>
                                      handleDelete(product._id)
                                    }
                                    className="btn btn-sm btn-outline-danger"
                                    title="Delete Product"
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>

                                </td>

                              </tr>
                            );
                          })

                        ) : (

                          <tr>

                            <td
                              colSpan="7"
                              className="text-center py-5"
                            >

                              <i className="bi bi-search fs-1 text-muted"></i>

                              <h5 className="mt-3">
                                No Products Found
                              </h5>

                              <p className="text-muted mb-0">
                                Try changing your search or category filter.
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

                <div className="d-flex justify-content-between align-items-center">

                  <small className="text-muted">
                    Showing {filteredProducts.length} of{" "}
                    {products.length} products
                  </small>

                  <small className="text-muted">
                    Product Management
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminProducts;