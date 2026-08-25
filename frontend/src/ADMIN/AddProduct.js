import { Link } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar";
function AddProduct() {
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
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold">
                  Add Product
                </h2>
                <p className="text-muted">
                  Add a new product to ClickCart
                </p>
              </div>
              <Link
                to="/admin/products"
                className="btn btn-outline-secondary"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back
              </Link>
            </div>
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <form>
                  <div className="row g-4">
                    {/* Product Name */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter product name"
                      />
                    </div>
                    {/* Category */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Category
                      </label>
                      <select className="form-select">
                        <option value="">
                          Select Category
                        </option>
                        <option value="Electronics">
                          Electronics
                        </option>
                        <option value="Fashion">
                          Fashion
                        </option>
                        <option value="Shoes">
                          Shoes
                        </option>
                        <option value="Beauty">
                          Beauty
                        </option>
                      </select>
                    </div>
                    {/* Price */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter price"
                      />
                    </div>
                    {/* Old Price */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Old Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter old price"
                      />
                    </div>
                    {/* Image */}
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Product Image URL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter image URL"
                      />
                    </div>
                    {/* Description */}
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Enter product description"
                      ></textarea>
                    </div>
                    {/* Buttons */}
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary me-2"
                      >
                        <i className="bi bi-plus-lg me-2"></i>
                        Add Product
                      </button>
                      <Link
                        to="/admin/products"
                        className="btn btn-secondary"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddProduct;