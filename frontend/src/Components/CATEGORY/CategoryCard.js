function CategoryCard({ image, name }) {
  return (
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

      <h6 className="mt-3">{name}</h6>

    </div>
  );
}

export default CategoryCard;