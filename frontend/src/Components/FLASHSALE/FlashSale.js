import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlashCard from "./FlashCard";
import API_URL from "../../services/api";

function FlashSale() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        const productList = data.products || data || [];

        const shuffled = [...productList]
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        const formattedProducts = shuffled.map((product) => {
          const oldPrice = product.oldPrice || product.price;

          const discount =
            oldPrice > product.price
              ? `-${Math.round(
                  ((oldPrice - product.price) / oldPrice) * 100
                )}%`
              : "Sale";

          return {
            ...product,
            id: product._id,
            title: product.name,
            oldPrice,
            discount,
          };
        });

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Flash sale error:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-5 bg-light">
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2 className="fw-bold">
              🔥 Flash Sale
            </h2>

            <p className="text-muted">
              Limited Time Offers
            </p>
          </div>

          <Link
            to="/products"
            className="btn btn-outline-primary"
          >
            View All
          </Link>

        </div>

        <div className="row g-4">

          {products.map((item) => (

            <div
              className="col-lg-3 col-md-6"
              key={item.id}
            >
              <FlashCard item={item} />
            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FlashSale;