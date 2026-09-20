import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading orders...</h4>
      </div>
    );
  }

  return (
    <>
      <section className="bg-light py-4">
        <div className="container">
          <h2 className="fw-bold mb-0">My Orders</h2>
        </div>
      </section>

      <section className="py-5">
        <div className="container">

          {orders.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-box-seam display-1 text-muted"></i>

              <h3 className="mt-3">
                No Orders Yet
              </h3>

              <p className="text-muted">
                You haven't placed any orders yet.
              </p>

              <Link
                to="/products"
                className="btn btn-primary"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="card border-0 shadow-sm mb-4"
              >
                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5 className="fw-bold mb-1">
                        Order #{order._id.slice(-6)}
                      </h5>

                      <small className="text-muted">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </small>
                    </div>

                    <span className="badge bg-warning text-dark">
                      {order.status}
                    </span>
                  </div>

                  <hr />

                  {order.products.map((item) => (
                    <div
                      key={item.product?._id || item.product}
                      className="d-flex justify-content-between mb-2"
                    >
                      <span>
                        {item.product?.name || "Product"} × {item.quantity}
                      </span>
                    </div>
                  ))}

                  <hr />

                  <div className="d-flex justify-content-between">
                    <strong>Total</strong>

                    <strong className="text-primary">
                      ₹{order.totalPrice}
                    </strong>
                  </div>

                </div>
              </div>
            ))
          )}

        </div>
      </section>
    </>
  );
}

export default Orders;