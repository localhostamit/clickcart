import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CONTEXT/CartContext";
import API_URL from "../services/api";
import { useState } from "react";
function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const handlePlaceOrder = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login before placing an order.");
    navigate("/login");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!data.success) {
      alert(data.message || "Failed to place order.");
      return;
    }

    navigate("/order-success");
  } catch (error) {
    console.error("Order error:", error);
    alert("Unable to place order. Please try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      {/* Page Header */}
      <section className="bg-light py-4">
        <div className="container">
          <h1 className="fw-bold mb-1">Checkout</h1>
          <p className="text-muted mb-0">
            Complete your order
          </p>
        </div>
      </section>
      {/* Checkout */}
      <section className="py-5">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-cart-x display-1 text-muted"></i>
              <h3 className="fw-bold mt-3">
                Your Cart is Empty
              </h3>
              <p className="text-muted">
                Add some products before checkout.
              </p>
              <Link
                to="/products"
                className="btn btn-primary"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="row g-5">
              {/* Customer Details */}
              <div className="col-lg-7">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="fw-bold mb-4">
                      Delivery Information
                    </h4>
                    <div className="row g-3">
                      {/* Name */}
                      <div className="col-md-6">
                        <label className="form-label">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your name"
                        />
                      </div>
                      {/* Phone */}
                      <div className="col-md-6">
                        <label className="form-label">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Enter phone number"
                        />
                      </div>
                      {/* Email */}
                      <div className="col-12">
                        <label className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email"
                        />
                      </div>
                      {/* Address */}
                      <div className="col-12">
                        <label className="form-label">
                          Address
                        </label>
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Enter your full address"
                        ></textarea>
                      </div>
                      {/* City */}
                      <div className="col-md-6">
                        <label className="form-label">
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter city"
                        />
                      </div>
                      {/* Pincode */}
                      <div className="col-md-6">
                        <label className="form-label">
                          Pincode
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter pincode"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Order Summary */}
              <div className="col-lg-5">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="fw-bold mb-4">
                      Order Summary
                    </h4>
                    {/* Products */}
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="d-flex gap-3 mb-3"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "contain",
                          }}
                          className="border rounded p-1"
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-1">
                            {item.title}
                          </h6>
                          <small className="text-muted">
                            Quantity: {item.quantity}
                          </small>
                        </div>
                        <strong>
                          ₹{item.price * item.quantity}
                        </strong>
                      </div>
                    ))}
                    <hr />
                    {/* Total */}
                    <div className="d-flex justify-content-between mb-3">
                      <span>
                        Total
                      </span>
                      <strong className="text-primary fs-5">
                        ₹{total.toFixed(2)}
                      </strong>
                    </div>
                    {/* Place Order */}
                <button
  type="button"
  className="btn btn-primary w-100 btn-lg"
  onClick={handlePlaceOrder}
  disabled={loading}
>
  <i className="bi bi-check-circle me-2"></i>
  {loading ? "Placing Order..." : "Place Order"}
</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
export default Checkout;