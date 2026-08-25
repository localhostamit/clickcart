import { Link, useNavigate } from "react-router-dom";
function AdminSidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };
  return (
    <div className="bg-dark text-white min-vh-100 p-3">
      <h4 className="fw-bold mb-4">
        ClickCart
      </h4>
      <p className="text-secondary">
        Admin Panel
      </p>
      <div className="d-flex flex-column gap-2">
        {/* Dashboard */}
        <Link
          to="/admin"
          className="text-white text-decoration-none p-2 rounded"
        >
          <i className="bi bi-speedometer2 me-2"></i>
          Dashboard
        </Link>
        {/* Products */}
        <Link
          to="/admin/products"
          className="text-white text-decoration-none p-2 rounded"
        >
          <i className="bi bi-box-seam me-2"></i>
          Products
        </Link>
        {/* Orders */}
        <Link
          to="/admin/orders"
          className="text-white text-decoration-none p-2 rounded"
        >
          <i className="bi bi-cart-check me-2"></i>
          Orders
        </Link>
        {/* Users */}
        <Link
          to="/admin/users"
          className="text-white text-decoration-none p-2 rounded"
        >
          <i className="bi bi-people me-2"></i>
          Users
        </Link>
        {/* Categories */}
        <Link
          to="/admin/categories"
          className="text-white text-decoration-none p-2 rounded"
        >
          <i className="bi bi-grid me-2"></i>
          Categories
        </Link>
      </div>
      {/* Logout */}
      <div className="mt-5">
        <button
          onClick={handleLogout}
          className="btn btn-danger w-100"
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </div>
  );
}
export default AdminSidebar;