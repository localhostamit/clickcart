import { Link } from "react-router-dom";
import { useWishlist } from "../CONTEXT/WishlistContext";
function Wishlist() {
  const { wishlistItems, removeFromWishlist, } = useWishlist();
  return (
    <section className="py-5 bg-light">
      <div className="container">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-heart display-1 text-danger"></i>
            <h2 className="fw-bold mt-3">
              Your Wishlist is Empty
            </h2>
            <p className="text-muted">
              You haven't added any products to your wishlist yet.
            </p>
            <Link to="/products"
              className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {wishlistItems.map((product) => (
              <div
                className="col-md-6 col-lg-4"
                key={product.id}
              >
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={product.image}
                    className="card-img-top p-3"
                    alt={product.title}
                    style={{
                      height: "220px",
                      objectFit: "contain",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="fw-bold">
                      {product.title}
                    </h5>
                    <h5 className="text-primary">
                      ₹{product.price}
                    </h5>
                    <div className="d-flex gap-2 mt-3">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-primary flex-grow-1"
                      >
                        View Product
                      </Link>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() =>
                          removeFromWishlist(product.id)
                        }
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>)}
      </div>
    </section>
  );
}
export default Wishlist;