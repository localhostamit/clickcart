function BottomNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary">

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
            <a className="nav-link text-white" href="/">Products</a>
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