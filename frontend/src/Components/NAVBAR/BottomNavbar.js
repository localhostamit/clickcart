import { Link } from "react-router-dom";

function BottomNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary d-none d-lg-block">
      <div className="container">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <a className="nav-link text-white" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/">Shop</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/">Categories</a>
          </li>
          <li className="nav-item">
            <Link
              to="/products"
              className="nav-link text-white"
            >
              Products
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/">Deals</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default BottomNavbar;