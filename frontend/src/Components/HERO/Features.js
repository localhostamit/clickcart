function Features() {
  return (
    <div className="container my-5">

      <div className="row g-4">

        <div className="col-md-4">

          <div className="card text-center shadow-sm">

            <div className="card-body">

              <i className="bi bi-truck fs-1 text-primary"></i>

              <h5 className="mt-3">
                Free Shipping
              </h5>

              <p>
                Free shipping on all orders.
              </p>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card text-center shadow-sm">

            <div className="card-body">

              <i className="bi bi-arrow-repeat fs-1 text-success"></i>

              <h5 className="mt-3">
                Easy Returns
              </h5>

              <p>
                7 Days Easy Return Policy.
              </p>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card text-center shadow-sm">

            <div className="card-body">

              <i className="bi bi-headset fs-1 text-danger"></i>

              <h5 className="mt-3">
                24/7 Support
              </h5>

              <p>
                Customer support anytime.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Features;