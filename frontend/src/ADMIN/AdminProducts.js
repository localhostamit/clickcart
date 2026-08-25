import { useState } from "react";
import { Link } from "react-router-dom";
import ProductData from "../Components/PRODUCT/ProductData";
import AdminSidebar from "../Components/Admin/AdminSidebar";
function AdminProducts() {
  const [products, setProducts] = useState(ProductData);
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
                  Products
                </h2>
                <p className="text-muted mb-0">
                  Manage your products
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
            {/* Product Table */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <img
                              src={product.image}
                              alt={product.title}
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "contain",
                              }}
                            />
                          </td>
                          <td>
                            <strong>
                              {product.title}
                            </strong>
                          </td>
                          <td>
                            <span className="badge bg-primary">
                              {product.category}
                            </span>
                          </td>
                          <td>
                            ₹{product.price}
                          </td>
                          <td>
                            {/* Edit */}
                            <Link
                              to={`/admin/products/edit/${product.id}`}
                              className="btn btn-sm btn-outline-primary me-2"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            {/* Delete */}
                            <button
                              onClick={() =>
                                handleDelete(product.id)
                              }
                              className="btn btn-sm btn-outline-danger"
                            >
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
export default AdminProducts;