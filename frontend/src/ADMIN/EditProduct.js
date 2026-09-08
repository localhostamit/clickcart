import { Link, useParams } from "react-router-dom";
import ProductData from "../Components/PRODUCT/ProductData";
import AdminSidebar from "../Components/Admin/AdminSidebar";
function EditProduct() {
  const { id } = useParams();
  const product = ProductData.find(
    (item) => item.id === Number(id)
  );
  if (!product) {
    return (
      <div className="container py-5">
        <h3>Product not found</h3>
        <Link
          to="/admin/products"
          className="btn btn-primary mt-3"
        >
          Back to Products
        </Link>
      </div>
    );
  }
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
                  Edit Product
                </h2>
                <p className="text-muted">
                  Update product information
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
                        defaultValue={product.title}
                      />
                    </div>
                    {/* Category */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Category
                      </label>
                      <select
                        className="form-select"
                        defaultValue={product.category}
                      >
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
                        defaultValue={product.price}
                      />
                    </div>
                    {/* Image */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Image URL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={product.image}
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
                    {/* Update */}
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        <i className="bi bi-check-lg me-2"></i>
                        Update Product
                      </button>
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
export default EditProduct;