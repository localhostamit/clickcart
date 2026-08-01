function Topbar() {
  return (
    <div className="bg-dark text-white py-2">
      <div className="container d-flex justify-content-between">

        <small>
          🚚 Free Shipping on Orders Over ₹999
        </small>

        <div>

          <span className="me-4">
            <i className="bi bi-telephone"></i> +91 9876543210
          </span>

          <span>
            <i className="bi bi-envelope"></i> support@clickcart.com
          </span>

        </div>

      </div>
    </div>
  );
}

export default Topbar;