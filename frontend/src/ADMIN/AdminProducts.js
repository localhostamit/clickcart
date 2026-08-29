import { useState } from "react";
import { Link } from "react-router-dom";
import ProductData from "../Components/PRODUCT/ProductData";
import AdminSidebar from "../Components/Admin/AdminSidebar";

function AdminProducts() {
  const [products, setProducts] = useState(ProductData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    setProducts((items) =>
      items.filter((product) => product.id !== id)
    );
  };

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

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


            {/* Stats */}
            <div className="row g-3 mb-4">

              <div className="col-md-4">

                <div className="card border-0 shadow-sm">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <div>
                        <p className="text-muted mb-1">
                          Total Products
                        </p>

                        <h4 className="fw-bold mb-0">
                          {products.length}
                        </h4>
                      </div>

                      <i className="bi bi-box-seam fs-2 text-primary"></i>

                    </div>

                  </div>

                </div>

              </div>


              <div className="col-md-4">

                <div className="card border-0 shadow-sm">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <div>
                        <p className="text-muted mb-1">
                          Categories
                        </p>

                        <h4 className="fw-bold mb-0">
                          {categories.length - 1}
                        </h4>
                      </div>

                      <i className="bi bi-grid fs-2 text-success"></i>

                    </div>

                  </div>

                </div>

              </div>


              <div className="col-md-4">

                <div className="card border-0 shadow-sm">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <div>
                        <p className="text-muted mb-1">
                          Showing
                        </p>

                        <h4 className="fw-bold mb-0">
                          {filteredProducts.length}
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

                        filteredProducts.map((product) => (

                          <tr key={product.id}>

                            {/* Image */}
                            <td className="px-4">

                              <div
                                className="bg-light rounded d-flex align-items-center justify-content-center"
                                style={{
                                  width: "65px",
                                  height: "65px",
                                }}
                              >

                                <img
                                  src={product.image}
                                  alt={product.title}
                                  style={{
                                    width: "55px",
                                    height: "55px",
                                    objectFit: "contain",
                                  }}
                                />

                              </div>

                            </td>


                            {/* Product */}
                            <td>

                              <strong>
                                {product.title}
                              </strong>

                              <br />

                              <small className="text-muted">
                                ID: #{product.id}
                              </small>

                            </td>


                            {/* Category */}
                            <td>

                              <span className="badge bg-primary">
                                {product.category}
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

                              <span className="text-muted">
                                Available
                              </span>

                            </td>


                            {/* Status */}
                            <td>

                              <span className="badge bg-success">
                                Active
                              </span>

                            </td>


                            {/* Actions */}
                            <td>

                              <Link
                                to={`/admin/products/edit/${product.id}`}
                                className="btn btn-sm btn-outline-primary me-2"
                                title="Edit Product"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>

                              <button
                                onClick={() =>
                                  handleDelete(product.id)
                                }
                                className="btn btn-sm btn-outline-danger"
                                title="Delete Product"
                              >
                                <i className="bi bi-trash"></i>
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