import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../services/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("LOGIN RESPONSE:", data);
console.log("USER ROLE:", data.user?.role);

      if (!data.success) {
        setError(data.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      // Check admin role
      if (data.user.role !== "admin") {
        setError("You do not have admin access.");
        setLoading(false);
        return;
      }

      // Save normal authentication data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/admin", {
        replace: true,
      });

    } catch (error) {
      console.error("Admin login error:", error);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-3">
      <div
        className="card border-0 shadow"
        style={{
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <div className="card-body p-4 p-md-5">

          {/* Logo */}
          <div className="text-center mb-4">
            <div
              className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: "70px",
                height: "70px",
              }}
            >
              <i className="bi bi-shield-lock fs-2 text-primary"></i>
            </div>

            <h2 className="fw-bold text-primary mb-1">
              ClickCart
            </h2>

            <p className="text-muted mb-0">
              Admin Panel
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
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
                  required
                />
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
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              disabled={loading}
            >
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

          {/* Back */}
          <div className="text-center mt-4">
            <button
              type="button"
              className="btn btn-link text-decoration-none"
              onClick={() => navigate("/")}
            >
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