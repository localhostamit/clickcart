import ProductCard from "./ProductCard";
import ProductData from "./ProductData";

function ProductSection() {
  return (
    <section className="py-5">

      <div className="container">

        <h2 className="fw-bold text-center mb-5">
          Featured Products
        </h2>

        <div className="row g-4">

          {ProductData.map((product) => (
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