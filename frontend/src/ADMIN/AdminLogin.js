import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Temporary frontend admin accounts
    // Backend connect hone ke baad authentication API se hoga
    const validAdmins = [
      {
        email: "amit@gmail.com",
        password: "amit123",
      },
      {
        email: "sahil@gmail.com",
        password: "sahil123",
      },
    ];
    const isValidAdmin = validAdmins.some(
      (admin) =>
        admin.email === email &&
        admin.password === password
    );
    if (isValidAdmin) {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin", {
        replace: true,
      });
      return;
    }
    setError("Invalid admin email or password");
    setLoading(false);
  };
  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-3">
      <div
        className="card border-0 shadow"
        style={{
          width: "100%",
          maxWidth: "420px",
        }}>
        <div className="card-body p-4 p-md-5">
          {/* Logo */}
          <div className="text-center mb-4">
            <div
              className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: "70px",
                height: "70px",
              }}>
              <i className="bi bi-shield-lock fs-2 text-primary"></i>
            </div>
            <h2 className="fw-bold text-primary mb-1">
              ClickCart
            </h2>
            <p className="text-muted mb-0">
              Admin Panel
            </p>
          </div>
          {/* Error Message */}
          {error && (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert">
              <i className="bi bi-exclamation-circle me-2"></i>
              {error}
            </div>
          )}
          {/* Login Form */}
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Admin Email
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required/>
              </div>
            </div>
            {/* Password */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required/>
              </div>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login to Admin Panel
                </>
              )}
            </button>
          </form>
          {/* Back to Website */}
          <div className="text-center mt-4">
            <button
              type="button"
              className="btn btn-link text-decoration-none"
              onClick={() => navigate("/")}>
              <i className="bi bi-arrow-left me-2"></i>
              Back to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;