import { Link } from "react-router-dom";
function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.title}
        style={{ height: "220px", objectFit: "cover" }}
      />
      <div className="card-body">
       <Link to={`/product/${product.id}`}
          className="text-decoration-none text-dark">
        <h5>{product.title}</h5></Link> 
        <p className="text-warning mb-2">
          ⭐ {product.rating}
        </p>
        <h5 className="text-primary">
          ₹{product.price}
        </h5>
        <small className="text-decoration-line-through text-muted">
          ₹{product.oldPrice}
        </small>
      </div>
      <div className="card-footer bg-white border-0">
        <button className="btn btn-primary w-100">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
export default ProductCard;