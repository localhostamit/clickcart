import { Link } from "react-router-dom";
function About() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h1 className="fw-bold">About ClickCart</h1>
          <p className="text-muted mb-0">
            Learn more about our online shopping platform
          </p>
        </div>
      </section>
      {/* About Content */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Image */}
            <div className="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
                alt="Online Shopping"
                className="img-fluid rounded shadow-sm"
              />
            </div>
            {/* Text */}
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">
                Welcome to ClickCart
              </h2>
              <p className="text-muted">
                ClickCart is a simple and user-friendly e-commerce
                platform where customers can explore and purchase
                different types of products online.
              </p>
              <p className="text-muted">
                Our goal is to provide a smooth shopping experience
                with a variety of products, simple navigation and
                an easy-to-use interface.
              </p>
              <Link
                to="/products"
                className="btn btn-primary"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Features */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">
            Why Choose ClickCart?
          </h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <i className="bi bi-box-seam fs-1 text-primary"></i>
                  <h5 className="fw-bold mt-3">
                    Quality Products
                  </h5>
                  <p className="text-muted">
                    Find useful and quality products in one place.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <i className="bi bi-cart-check fs-1 text-primary"></i>
                  <h5 className="fw-bold mt-3">
                    Easy Shopping
                  </h5>
                  <p className="text-muted">
                    Browse products and add them to your cart easily.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <i className="bi bi-headset fs-1 text-primary"></i>
                  <h5 className="fw-bold mt-3">
                    Customer Support
                  </h5>
                  <p className="text-muted">
                    Get help whenever you need assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default About;