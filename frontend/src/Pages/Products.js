import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../Components/PRODUCT/ProductCard";
import ProductData from "../Components/PRODUCT/ProductData";
function Products() {
    const [search, setSearch] = useState("");
const [searchParams] = useSearchParams();
const urlCategory = searchParams.get("category");
const [category, setCategory] = useState(
  urlCategory || "All"
);
useEffect(() => {
  setCategory(urlCategory || "All");
}, [urlCategory]);
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Shoes",
    "Beauty",
  ];
  const filteredProducts = ProductData.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      category === "All" || product.category === category;
    return matchSearch && matchCategory;
  });
  return (
    <>
      {/* Page Header */}
      <section className="bg-light py-5">
        <div className="container">
          <h1 className="fw-bold">All Products</h1>
          <p className="text-muted mb-0">
            Find the best products at the best prices.
          </p>
        </div>
      </section>
      {/* Products */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">
                    Categories
                  </h5>
                  {categories.map((item) => (
                    <button
                      key={item}
                      onClick={() => setCategory(item)}
                      className={`btn w-100 text-start mb-2 ${
                        category === item
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Products Area */}
            <div className="col-lg-9">
              {/* Search */}
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-primary">
                  <i className="bi bi-search"></i>
                </button>
              </div>
              {/* Product Grid */}
              <div className="row g-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      className="col-md-6 col-lg-4"
                      key={product.id}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <h4>No products found</h4>
                    <p className="text-muted">
                      Try another search or category.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Products;