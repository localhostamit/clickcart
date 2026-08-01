function BannerCard({ title, subtitle, button, image }) {
  return (
    <div className="card border-0 shadow h-100">
      <div className="row g-0 align-items-center">

        <div className="col-md-7">
          <div className="card-body p-4">
            <small className="text-danger fw-bold">
              Limited Offer
            </small>

            <h3 className="fw-bold mt-2">
              {title}
            </h3>

            <p className="text-muted">
              {subtitle}
            </p>

            <button className="btn btn-primary">
              {button}
            </button>
          </div>
        </div>

        <div className="col-md-5 text-center">
          <img
            src={image}
            className="img-fluid p-3"
            alt={title}
          />
        </div>

      </div>
    </div>
  );
}

export default BannerCard;