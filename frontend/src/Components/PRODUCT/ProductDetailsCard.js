import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CONTEXT/CartContext";
import { useWishlist } from "../../CONTEXT/WishlistContext";

function ProductDetailsCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    addToWishlist,
    isInWishlist,
    removeFromWishlist,
  } = useWishlist();

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async () => {
    await addToCart(product, quantity);
  };

  // =========================
  // BUY NOW
  // =========================
  const handleBuyNow = async () => {
    await addToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <div className="row g-5">

      {/* Product Image */}
      <div className="col-md-6">

        <div className="border rounded p-4 text-center">

          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{
              height: "400px",
              objectFit: "contain",
            }}
          />

        </div>

      </div>

      {/* Product Information */}
      <div className="col-md-6">

        <span className="badge bg-primary mb-3">
          {product.category}
        </span>

        <h1 className="fw-bold">
          {product.title}
        </h1>

        {/* Rating */}
        <div className="mb-3">

          <span className="text-warning">
            ⭐⭐⭐⭐⭐
          </span>

          <span className="text-muted ms-2">
            {product.rating || "No"} Rating
          </span>

        </div>

        {/* Price */}
        <h2 className="text-primary fw-bold">
          ₹{product.price}
        </h2>

        <hr />

        {/* Description */}
        <p className="text-muted">
          {product.description ||
            "No description available for this product."}
        </p>

        {/* Stock */}
        {typeof product.stock === "number" && (
          <p className="mb-3">
            <strong>Stock:</strong>{" "}
            {product.stock > 0
              ? `${product.stock} available`
              : "Out of Stock"}
          </p>
        )}

        {/* Quantity */}
        <div className="d-flex align-items-center gap-3 mb-4">

          <strong>
            Quantity:
          </strong>

          <div
            className="input-group"
            style={{ width: "130px" }}
          >

            <button
              className="btn btn-outline-secondary"
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
            >
              -
            </button>

            <span className="form-control text-center">
              {quantity}
            </span>

            <button
              className="btn btn-outline-secondary"
              onClick={() =>
                setQuantity((q) =>
                  product.stock
                    ? Math.min(q + 1, product.stock)
                    : q + 1
                )
              }
              disabled={
                typeof product.stock === "number" &&
                quantity >= product.stock
              }
            >
              +
            </button>

          </div>

        </div>

        {/* Buttons */}
        <div className="d-flex gap-3 flex-wrap">

          {/* Add To Cart */}
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >

            <i className="bi bi-cart3 me-2"></i>

            {product.stock === 0
              ? "Out of Stock"
              : "Add To Cart"}

          </button>

          {/* Buy Now */}
          <button
            type="button"
            className="btn btn-warning btn-lg"
            onClick={handleBuyNow}
            disabled={product.stock === 0}
          >

            <i className="bi bi-lightning-fill me-2"></i>

            Buy Now

          </button>

          {/* Wishlist */}
          <button
            type="button"
            className="btn btn-outline-danger btn-lg"
            onClick={() => {

              if (isInWishlist(product.id)) {

                removeFromWishlist(product.id);

              } else {

                addToWishlist(product);

              }

            }}
          >

            <i
              className={
                isInWishlist(product.id)
                  ? "bi bi-heart-fill me-2"
                  : "bi bi-heart me-2"
              }
            ></i>

            {isInWishlist(product.id)
              ? "Remove from Wishlist"
              : "Add to Wishlist"}

          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetailsCard;