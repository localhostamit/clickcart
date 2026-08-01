import FlashCard from "./FlashCard";
import FlashData from "./FlashData";

function FlashSale() {
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

          <button className="btn btn-outline-primary">
            View All
          </button>

        </div>

        <div className="row g-4">

          {FlashData.map((item) => (
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