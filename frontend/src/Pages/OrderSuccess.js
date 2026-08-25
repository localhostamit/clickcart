import { Link } from "react-router-dom";
function OrderSuccess() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center py-5">
          <i className="bi bi-check-circle-fill text-success display-1"></i>
          <h1 className="fw-bold mt-4">
            Order Placed Successfully!
          </h1>
          <p className="text-muted mt-3">
            Thank you for shopping with ClickCart.
          </p>
          <p className="text-muted">
            Your order has been successfully placed.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link
              to="/products"
              className="btn btn-primary"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="btn btn-outline-secondary"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default OrderSuccess;