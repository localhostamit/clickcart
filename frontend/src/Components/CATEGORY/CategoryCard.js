import { Link } from "react-router-dom";
function CategoryCard({ image, name }) {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(name)}`}
      className="text-decoration-none text-dark"
    >
      <div className="text-center">
        <div
          className="rounded-circle shadow p-4 mx-auto d-flex justify-content-center align-items-center"
          style={{ width: "120px", height: "120px" }}
        >
          <img
            src={image}
            alt={name}
            className="img-fluid"
            style={{ width: "60px" }}
          />
        </div>
        <h6 className="mt-3">
          {name}
        </h6>
      </div>
    </Link>
  );
}
export default CategoryCard;