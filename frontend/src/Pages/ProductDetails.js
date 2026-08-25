import { useParams } from "react-router-dom";
import ProductDetailsCard from "../Components/PRODUCT/ProductDetailsCard";
import ProductData from "../Components/PRODUCT/ProductData";
function ProductDetails() {
  const { id } = useParams();
  const product = ProductData.find(
    (item) => item.id === Number(id)
  );
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