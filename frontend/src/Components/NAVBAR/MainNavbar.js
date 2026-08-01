function MainNavbar() {
  return (
    <div className="bg-white py-3 border-bottom">
      <div className="container">

        <div className="row align-items-center">

          <div className="col-lg-2">
            <h2 className="fw-bold text-primary">
              ClickCart
            </h2>
          </div>

          <div className="col-lg-6">

            <div className="input-group">

              <input
                className="form-control"
                placeholder="Search Products..."
              />

              <button className="btn btn-primary">
                <i className="bi bi-search"></i>
              </button>

            </div>

          </div>

          <div className="col-lg-4">

            <div className="d-flex justify-content-end gap-4">

              <i className="bi bi-heart fs-4"></i>

              <i className="bi bi-cart3 fs-4"></i>

              <i className="bi bi-person fs-4"></i>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default MainNavbar;