import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetailsCard from "../Components/PRODUCT/ProductDetailsCard";
import API_URL from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/products/${id}`
        );

        const data = await response.json();

        if (data.success) {
          const backendProduct = data.product;

          // Convert backend format to the format
          // expected by the existing ProductDetailsCard
          setProduct({
            id: backendProduct._id,
            title: backendProduct.name,
            price: backendProduct.price,
            description: backendProduct.description,
            stock: backendProduct.stock,
            image: backendProduct.image,
            category: backendProduct.category?.name || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <section className="bg-light py-4">
        <div className="container">
          <h2 className="fw-bold">Product Details</h2>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <ProductDetailsCard product={product} />
        </div>
      </section>
    </>
  );
}

export default ProductDetails;