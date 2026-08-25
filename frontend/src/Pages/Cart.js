import { Link } from "react-router-dom";
import CartItem from "../Components/CART/CartItem";
import { useCart } from "../CONTEXT/CartContext";
function Cart() {
  const { cartItems } = useCart();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <>
      {/* Header */}
      <section className="bg-light py-4">
        <div className="container">
          <h2 className="fw-bold mb-0">Shopping Cart</h2>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-cart-x display-1 text-muted"></i>
              <h3 className="mt-3">
                Your Cart is Empty
              </h3>
              <p className="text-muted">
                Add some products to your cart.
              </p>
              <Link
                to="/products"
                className="btn btn-primary"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="row">
              {/* Cart Items */}
              <div className="col-lg-8">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                  />
                ))}
              </div>
              {/* Summary */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h4 className="fw-bold mb-4">
                      Order Summary
                    </h4>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Subtotal</span>
                      <strong>₹{totalPrice}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Shipping</span>
                      <span className="text-success">
                        Free
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-4">
                      <h5>Total</h5>
                      <h5 className="text-primary">
                        ₹{totalPrice}
                      </h5>
                    </div>
                 <Link
  to="/checkout"
  className="btn btn-primary w-100"
>
  Proceed to Checkout
</Link>
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
export default Cart;