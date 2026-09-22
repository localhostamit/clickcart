import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../CONTEXT/CartContext";

function MainNavbar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartItems } = useCart();
  
  // API/Auth connection: checking for token
  const token = localStorage.getItem("token");

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(search)}`);
    } else {
      navigate("/products");
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
const showHelpCenter = () => {
  alert("Please contact amit@amitdev.dpdns.org");
};

const showReturns = () => {
  alert(
    "Website returns are not available yet. Please contact amit@amitdev.dpdns.org"
  );
};
  return (
    <div className="bg-white border-bottom">
      <div className="container">

        {/* ================= TOP NAVBAR ================= */}
        <div className="row align-items-center py-3 g-3">

          {/* ================= LOGO ================= */}
          <div className="col-6 col-lg-3">
            <Link
              to="/"
              className="text-decoration-none"
              onClick={closeMenu}
            >
              <h2 className="fw-bold text-primary mb-0">
                ClickCart
              </h2>
            </Link>
          </div>

          {/* ================= SEARCH BAR ================= */}
          <div className="col-12 col-lg-6 order-3 order-lg-0">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search Products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button
                className="btn btn-primary"
                onClick={handleSearch}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>

          {/* ================= ICONS ================= */}
          <div className="col-6 col-lg-3">
            <div className="d-flex justify-content-end align-items-center gap-3 gap-lg-4">

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="text-decoration-none text-dark"
                aria-label="Wishlist"
              >
                <i className="bi bi-heart fs-5 fs-lg-4"></i>
              </Link>

              {/* Orders (Conditional) */}
              {token && (
                <Link
                  to="/orders"
                  className="text-decoration-none text-dark d-none d-lg-block"
                  title="My Orders"
                >
                  <i className="bi bi-box-seam fs-5 fs-lg-4"></i>
                </Link>
              )}

              {/* Cart */}
              <Link
                to="/cart"
                className="text-decoration-none text-dark position-relative"
                aria-label="Cart"
              >
                <i className="bi bi-cart3 fs-5 fs-lg-4"></i>

                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile / Account (Conditional Route) */}
              <Link
                to={token ? "/orders" : "/login"}
                className="text-decoration-none text-dark"
                title={token ? "My Orders" : "Login"}
                aria-label="Profile"
              >
                <i className="bi bi-person fs-5 fs-lg-4"></i>
              </Link>

              {/* Mobile Hamburger */}
              <button
                type="button"
                className="btn p-0 d-lg-none"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <i
                  className={`bi ${
                    menuOpen ? "bi-x" : "bi-list"
                  } fs-3 text-dark`}
                ></i>
              </button>

            </div>
          </div>

        </div>

        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <div className="d-lg-none border-top py-2">

            <Link
              to="/"
              className="d-block text-decoration-none text-dark py-2"
              onClick={closeMenu}
            >
              Home
            </Link>

            <Link
              to="/products"
              className="d-block text-decoration-none text-dark py-2"
              onClick={closeMenu}
            >
              Shop
            </Link>

            <Link
              to="/products"
              className="d-block text-decoration-none text-dark py-2"
              onClick={closeMenu}
            >
              Categories
            </Link>

            <Link
              to="/products"
              className="d-block text-decoration-none text-dark py-2"
              onClick={closeMenu}
            >
              Products
            </Link>

            <Link
              to="/products"
              className="d-block text-decoration-none text-dark py-2"
              onClick={closeMenu}
            >
              Deals
            </Link>
            
            {token && (
              <Link
                to="/orders"
                className="d-block text-decoration-none text-dark py-2"
                onClick={closeMenu}
              >
                My Orders
              </Link>
            )}

            <Link
              to="/"
              className="d-block text-decoration-none text-dark py-2"
              onClick={closeMenu}
            >
              Contact
              <button
  type="button"
  className="btn btn-link text-decoration-none text-dark text-start p-0 py-2"
  onClick={() => {
    closeMenu();
    showHelpCenter();
  }}
>
  Help Center
</button>

<button
  type="button"
  className="btn btn-link text-decoration-none text-dark text-start p-0 py-2"
  onClick={() => {
    closeMenu();
    showReturns();
  }}
>
  Returns
</button>
            </Link>

          </div>
        )}

      </div>
    </div>
  );
}

export default MainNavbar;