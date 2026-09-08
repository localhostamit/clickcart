import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductData from "./ProductData";
function ProductSection() {
  const featuredProducts = ProductData.slice(0, 8);
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
        <div className="row g-4">
          {featuredProducts.map((product) => (
            <div
              className="col-lg-3 col-md-6"
              key={product.id}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default ProductSection;