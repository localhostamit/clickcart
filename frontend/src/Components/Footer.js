import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsYoutube,
} from "react-icons/bs";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          {/* Logo */}
          <div className="col-lg-4 mb-4">
            <h3 className="fw-bold text-warning">ClickCart</h3>
            <p className="text-light">
              Your one stop shopping destination.
              Buy quality products at the best price.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/" className="text-light text-decoration-none">Products</a></li>
              <li><a href="/" className="text-light text-decoration-none">Categories</a></li>
              <li><a href="/" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Customer */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Returns</li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-lg-3">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3 fs-4 mt-3">
              <BsFacebook />
              <BsInstagram />
              <BsTwitterX />
              <BsYoutube />
            </div>
          </div>
        </div>
        <hr />
        <p className="text-center mb-0">
          © 2026 ClickCart. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;