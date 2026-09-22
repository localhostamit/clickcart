import { Link } from "react-router-dom";
import { useCart } from "../../CONTEXT/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    await addToCart(product, 1);
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      
      <img
        src={product.image}
        className="card-img-top"
        alt={product.title}
        style={{ height: "220px", objectFit: "cover" }}
      />

      <div className="card-body">

        <Link
          to={`/product/${product.id}`}
          className="text-decoration-none text-dark"
        >
          <h5>{product.title}</h5>
        </Link>

        <p className="text-warning mb-2">
          ⭐ {product.rating || "No rating"}
        </p>

        <h5 className="text-primary">
          ₹{product.price}
        </h5>

      </div>

      <div className="card-footer bg-white border-0">

        <button
          className="btn btn-primary w-100"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <i className="bi bi-cart3 me-2"></i>

          {product.stock === 0
            ? "Out of Stock"
            : "Add To Cart"}
        </button>

      </div>

    </div>
  );
}

export default ProductCard;