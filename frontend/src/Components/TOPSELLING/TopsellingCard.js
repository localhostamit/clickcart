function TopsellingCard({ item }) {
  return (
    <div className="card border-0 shadow-sm h-100">
      <img
        src={item.image}
        className="card-img-top"
        alt={item.title}
        style={{ height: "220px", objectFit: "cover" }}
      />
      <div className="card-body">
        <small className="text-primary">
          {item.category}
        </small>
        <h6 className="mt-2">
          {item.title}
        </h6>
        <h5 className="text-danger">
          ₹{item.price}
        </h5>
        <button className="btn btn-dark w-100">
          Buy Now
        </button>
      </div>
    </div>
  );
}
export default TopsellingCard;