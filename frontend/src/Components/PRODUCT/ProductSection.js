import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import API_URL  from "../../services/api";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        const productList = data.products || data || [];

        // Shuffle products so the featured section isn't always identical
        const shuffled = [...productList].sort(
          () => Math.random() - 0.5
        );

        setProducts(shuffled);
      } catch (error) {
        console.error("Featured products error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const visibleProducts = showAll
    ? products
    : products.slice(0, 4);

  return (
    <section className="py-5">
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-5">

          <h2 className="fw-bold mb-0">
            Featured Products
          </h2>

          <Link
            to="/products"
            className="btn btn-outline-primary"
          >
            View All
          </Link>

        </div>

        {loading ? (

          <div className="text-center py-5">
            <div
              className="spinner-border text-primary"
              role="status"
            ></div>

            <p className="text-muted mt-3 mb-0">
              Loading products...
            </p>
          </div>

        ) : products.length === 0 ? (

          <div className="text-center py-5">
            <p className="text-muted">
              No products available.
            </p>
          </div>

        ) : (

          <>
            <div className="row g-4">

              {visibleProducts.map((product) => (

                <div
                  className="col-lg-3 col-md-6"
                  key={product._id}
                >
                  <ProductCard
                    product={{
                      ...product,

                      // Keep compatibility with existing ProductCard
                      id: product._id,
                      title: product.name,
                      oldPrice: product.oldPrice || product.price,
                    }}
                  />
                </div>

              ))}

            </div>

            {/* View More */}
            {!showAll && products.length > 4 && (

              <div className="text-center mt-4">

                <button
                  className="btn btn-outline-primary"
                  onClick={() => setShowAll(true)}
                >
                  View More
                  <i className="bi bi-arrow-down ms-2"></i>
                </button>

              </div>

            )}

          </>

        )}

      </div>
    </section>
  );
}

export default ProductSection;