import TopsellingCard from "./TopsellingCard";
import TopsellingData from "./TopsellingData";

function TopSelling() {
  return (
    <section className="py-5 bg-light">

      <div className="container">

        <h2 className="fw-bold text-center mb-4">
          Top Selling Products
        </h2>

        <ul className="nav nav-pills justify-content-center mb-5">

          <li className="nav-item">
            <button className="btn btn-primary me-2">
              All
            </button>
          </li>

          <li className="nav-item">
            <button className="btn btn-outline-primary me-2">
              Electronics
            </button>
          </li>

          <li className="nav-item">
            <button className="btn btn-outline-primary">
              Fashion
            </button>
          </li>

        </ul>

        <div className="row g-4">

          {TopsellingData.map((item) => (
            <div className="col-lg-3 col-md-6" key={item.id}>
              <TopsellingCard item={item} />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default TopSelling;