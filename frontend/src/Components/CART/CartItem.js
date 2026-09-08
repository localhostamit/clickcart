import { useCart } from "../../CONTEXT/CartContext";
function CartItem({ item }) {
  const {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          {/* Image */}
          <div className="col-md-2 text-center">
            <img
              src={item.image}
              alt={item.title}
              className="img-fluid"
              style={{
                height: "100px",
                width: "100px",
                objectFit: "contain",
              }}
            />
          </div>
          {/* Product */}
          <div className="col-md-3">
            <h5 className="fw-bold">{item.title}</h5>
            <p className="text-muted mb-0">
              ₹{item.price}
            </p>
          </div>
          {/* Quantity */}
          <div className="col-md-3">
            <div
              className="input-group"
              style={{ width: "130px" }}
            >
              <button
                className="btn btn-outline-secondary"
                onClick={() => decreaseQuantity(item.id)}
              >
                -
              </button>
              <span className="form-control text-center">
                {item.quantity}
              </span>
              <button
                className="btn btn-outline-secondary"
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>
            </div>
          </div>
          {/* Total */}
          <div className="col-md-2">
            <strong>
              ₹{item.price * item.quantity}
            </strong>
          </div>
          {/* Remove */}
          <div className="col-md-2 text-end">
            <button
              className="btn btn-outline-danger"
              onClick={() => removeFromCart(item.id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartItem;