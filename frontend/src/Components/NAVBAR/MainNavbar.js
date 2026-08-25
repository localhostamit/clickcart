import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../CONTEXT/CartContext";
function MainNavbar() {
  const navigate = useNavigate();
   const [search, setSearch] = useState("");
   const { cartItems } = useCart();
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
             <input className="form-control"
               placeholder="Search Products..."
                value={search}
                 onChange={(e) => setSearch(e.target.value)}/>
             <button className="btn btn-primary"
               onClick={() => {
                 if (search.trim() !== "") {
                   navigate(`/products?search=${encodeURIComponent(search)}`);
                  } else {
                 navigate("/products");
    }
  }}>
        <i className="bi bi-search"></i>
       </button>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="d-flex justify-content-end gap-4">
             <Link to="/wishlist"
              className="text-decoration-none text-dark">
               <i className="bi bi-heart fs-4"></i>
            </Link>
           <Link to="/cart"
             className="text-decoration-none text-dark position-relative">
             <i className="bi bi-cart3 fs-5"></i>
        {cartItems.length > 0 && (
       <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      {cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      )}
    </span>
  )}
</Link>
             <Link to="/login"
             className="text-decoration-none text-dark">
             <i className="bi bi-person fs-4"></i>
             </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainNavbar;  