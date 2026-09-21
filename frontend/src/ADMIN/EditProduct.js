import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import API_URL from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    image: "",
    description: "",
    stock: "",
  });

  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch product + categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        // Fetch product
        const productResponse = await fetch(
          `${API_URL}/api/products/${id}`
        );

        const productData = await productResponse.json();

        if (
          !productResponse.ok ||
          !productData.success
        ) {
          setError(
            productData.message ||
              "Product not found."
          );
          return;
        }

        const product = productData.product;

        setFormData({
          name: product.name || "",
          category:
            product.category?._id ||
            product.category ||
            "",
          price: product.price ?? "",
          oldPrice: product.oldPrice ?? "",
          image: product.image || "",
          description: product.description || "",
          stock: product.stock ?? "",
        });

        // Fetch categories
        const categoryResponse = await fetch(
          `${API_URL}/api/categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const categoryData =
          await categoryResponse.json();

        if (categoryData.success) {
          setCategories(
            categoryData.categories || []
          );
        } else {
          setError(
            categoryData.message ||
              "Failed to load categories."
          );
        }
      } catch (error) {
        console.error(
          "Fetch edit product error:",
          error
        );

        setError(
          "Unable to load product information."
        );
      } finally {
        setLoading(false);
        setLoadingCategories(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.image ||
      !formData.description ||
      formData.stock === ""
    ) {
      setError(
        "Please fill in all required fields."
      );
      return;
    }

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            category: formData.category,
            price: Number(formData.price),
            oldPrice: formData.oldPrice
              ? Number(formData.oldPrice)
              : undefined,
            image: formData.image,
            description: formData.description,
            stock: Number(formData.stock),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Failed to update product."
        );
        return;
      }

      alert(
        "Product updated successfully!"
      );

      navigate("/admin/products");
    } catch (error) {
      console.error(
        "Update product error:",
        error
      );

      setError(
        "Unable to connect to server."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row">

          <div className="col-lg-2 p-0">
            <AdminSidebar />
          </div>

          <div className="col-lg-10">

            <div className="d-flex justify-content-center align-items-center min-vh-100">

              <div className="text-center">

                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>

                <p className="text-muted mt-3">
                  Loading product...
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }

  // Product not found / error
  if (error && !formData.name) {
    return (
      <div className="container-fluid">
        <div className="row">

          <div className="col-lg-2 p-0">
            <AdminSidebar />
          </div>

          <div className="col-lg-10">

            <div className="p-4">

              <div className="alert alert-danger">
                {error}
              </div>

              <Link
                to="/admin/products"
                className="btn btn-primary"
              >
                Back to Products
              </Link>

            </div>

          </div>

        </div>
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

            {/* Header */}
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

            {/* Error */}
            {error && (
              <div className="alert alert-danger">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4">

                <form onSubmit={handleSubmit}>

                  <div className="row g-4">

                    {/* Product Name */}
                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Product Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                      />

                    </div>

                    {/* Category */}
                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Category
                      </label>

                      <select
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleChange}
                        disabled={loadingCategories}
                      >

                        <option value="">
                          {loadingCategories
                            ? "Loading categories..."
                            : "Select Category"}
                        </option>

                        {categories.map(
                          (category) => (
                            <option
                              key={category._id}
                              value={category._id}
                            >
                              {category.name}
                            </option>
                          )
                        )}

                      </select>

                    </div>

                    {/* Price */}
                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Price
                      </label>

                      <input
                        type="number"
                        name="price"
                        className="form-control"
                        placeholder="Enter price"
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                      />

                    </div>

                    {/* Old Price */}
                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Old Price
                      </label>

                      <input
                        type="number"
                        name="oldPrice"
                        className="form-control"
                        placeholder="Enter old price"
                        min="0"
                        value={formData.oldPrice}
                        onChange={handleChange}
                      />

                    </div>

                    {/* Stock */}
                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Stock
                      </label>

                      <input
                        type="number"
                        name="stock"
                        className="form-control"
                        placeholder="Enter stock quantity"
                        min="0"
                        value={formData.stock}
                        onChange={handleChange}
                      />

                    </div>

                    {/* Image */}
                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Image URL
                      </label>

                      <input
                        type="text"
                        name="image"
                        className="form-control"
                        placeholder="Enter image URL"
                        value={formData.image}
                        onChange={handleChange}
                      />

                    </div>

                    {/* Description */}
                    <div className="col-12">

                      <label className="form-label fw-semibold">
                        Description
                      </label>

                      <textarea
                        name="description"
                        className="form-control"
                        rows="4"
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>

                    </div>

                    {/* Update */}
                    <div className="col-12">

                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                      >

                        {submitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            Updating...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-lg me-2"></i>
                            Update Product
                          </>
                        )}

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