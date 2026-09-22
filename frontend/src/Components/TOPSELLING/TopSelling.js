import { useEffect, useState } from "react";
import TopsellingCard from "./TopsellingCard";
import API_URL from "../../services/api";

function TopSelling() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        const products = data.products || data || [];

        if (products.length === 0) {
          return;
        }

        // Products that have valid stock values
        const productsWithStock = products.filter(
          (item) =>
            typeof item.stock === "number"
        );

        let selectedProduct;

        if (productsWithStock.length > 0) {
          // Find product with lowest stock
          selectedProduct = productsWithStock.reduce(
            (lowest, current) =>
              current.stock < lowest.stock
                ? current
                : lowest
          );
        } else {
          // Fallback: random product
          selectedProduct =
            products[
              Math.floor(Math.random() * products.length)
            ];
        }

        setProduct({
          ...selectedProduct,
          id: selectedProduct._id,
          title: selectedProduct.name,
        });

      } catch (error) {
        console.error("Top selling error:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <section className="py-5 bg-light">
      <div className="container">

        <h2 className="fw-bold text-center mb-4">
          Top Selling Products
        </h2>

        <div className="row g-4">

          {product && (
            <div className="col-lg-3 col-md-6">
              <TopsellingCard item={product} />
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default TopSelling;