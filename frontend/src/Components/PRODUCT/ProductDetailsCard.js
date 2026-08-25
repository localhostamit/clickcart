import { useState } from "react";
import { useCart } from "../../CONTEXT/CartContext";
import { useWishlist } from "../../CONTEXT/WishlistContext";
function ProductDetailsCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const {addToWishlist,isInWishlist,removeFromWishlist,} = useWishlist();
  return (
    <div className="row g-5">
      {/* Product Image */}
      <div className="col-md-6">
        <div className="border rounded p-4 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ height: "400px", objectFit: "contain" }}
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
        <div className="mb-3">
          <span className="text-warning">
            ⭐⭐⭐⭐⭐
          </span>
          <span className="text-muted ms-2">
            {product.rating} Rating
          </span>
        </div>
        <h2 className="text-primary fw-bold">
          ₹{product.price}
        </h2>
        <p className="text-muted text-decoration-line-through">
          ₹{product.oldPrice}
        </p>
        <hr />
        <p className="text-muted">
          This is a high-quality product available at
          ClickCart. Get this product at an amazing price
          with fast delivery and easy returns.
        </p>
        {/* Quantity */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <strong>Quantity:</strong>
          <div className="input-group" style={{ width: "130px" }}>
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
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>
        {/* Buttons */}
        <div className="d-flex gap-3">
      <button type="button"
         className="btn btn-primary btn-lg"
          onClick={() => {
          console.log("Product:", product);
          console.log("addToCart:", addToCart);
          addToCart(product, quantity);
         alert("Product Added To Cart!");
      }}>
           <i className="bi bi-cart3 me-2"></i>Add To Cart</button>
          <button className="btn btn-warning btn-lg">
            Buy Now
          </button>
          <button type="button"
             className="btn btn-outline-danger btn-lg"
               onClick={() => {
                if (isInWishlist(product.id)) {
               removeFromWishlist(product.id);
          } else {
            addToWishlist(product);
            }}}>
        <i
    className={
      isInWishlist(product.id)? "bi bi-heart-fill me-2" : "bi bi-heart me-2"}></i>
          {isInWishlist(product.id)? "Remove from Wishlist" : "Add to Wishlist"}
         </button>
        </div>
      </div>
    </div>
  );
}
export default ProductDetailsCard;