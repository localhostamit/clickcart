import { Link } from "react-router-dom";
function HeroBanner() {
  return (
    <section className="bg-primary text-white py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side */}
          <div className="col-lg-6">
            <span className="badge bg-warning text-dark mb-3">
              New Collection
            </span>
            <h1 className="display-4 fw-bold">
              Best Shopping Experience
            </h1>
            <p className="lead">
              Discover the latest fashion, electronics and more
              with amazing discounts.
            </p>
            <Link
              to="/products"
              className="btn btn-warning btn-lg"
            >
              Shop Now
            </Link>
          </div>
          {/* Right Side */}
          <div className="col-lg-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=700"
              className="img-fluid rounded"
              alt="shopping"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default HeroBanner;