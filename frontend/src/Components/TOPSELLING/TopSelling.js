import { useState } from "react";
import TopsellingCard from "./TopsellingCard";
import TopsellingData from "./TopsellingData";
function TopSelling() {
  const [category, setCategory] = useState("All");
  const filteredProducts =
    category === "All"
      ? TopsellingData
      : TopsellingData.filter(
          (product) => product.category === category
        );
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="fw-bold text-center mb-4">
          Top Selling Products
        </h2>
        {/* Category Buttons */}
        <div className="text-center mb-5">
          <button
            onClick={() => setCategory("All")}
            className={category === "All"
                ? "btn btn-primary me-2"
                : "btn btn-outline-primary me-2"}>All
          </button>
          <button
            onClick={() => setCategory("Electronics")}
            className={
              category === "Electronics"
                ? "btn btn-primary me-2"
                : "btn btn-outline-primary me-2"
            }>
            Electronics
          </button>
          <button
            onClick={() => setCategory("Fashion")}
            className={
              category === "Fashion"
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
          >
            Fashion
          </button>
        </div>
        {/* Products */}
        <div className="row g-4">
          {filteredProducts.map((item) => (
            <div
              className="col-lg-3 col-md-6"
              key={item.id}
            >
              <TopsellingCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default TopSelling;