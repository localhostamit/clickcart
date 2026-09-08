import { useCart } from "../../CONTEXT/CartContext";
function FlashCard({ item }) {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart({
      ...item,
      quantity: 1,
    });
  };
  return (
    <div className="card border-0 shadow h-100">
      <span className="badge bg-danger position-absolute m-2">
        {item.discount}
      </span>
      <img
        src={item.image}
        alt={item.title}
        className="card-img-top"
        style={{
          height: "220px",
          objectFit: "cover",
        }}
      />
      <div className="card-body">
        <h6>{item.title}</h6>
        <p className="text-warning mb-1">
          ⭐ {item.rating}
        </p>
        <h5 className="text-primary">
          ₹{item.price}
        </h5>
        <small className="text-decoration-line-through">
          ₹{item.oldPrice}
        </small>
        <button
          className="btn btn-primary w-100 mt-3"
          onClick={handleAddToCart}
        >
          <i className="bi bi-cart3 me-2"></i>
          Add To Cart
        </button>
      </div>
    </div>
  );
}
export default FlashCard;