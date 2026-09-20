import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../services/api";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Please fill all fields.");
    return;
  }

  if (!email.includes("@")) {
    setError("Please enter a valid email.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

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

    if (!data.success) {
      setError(data.message || "Login failed.");
      return;
    }

    // Save JWT and user information
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/");
  } catch (error) {
    console.error("Login error:", error);
    setError("Unable to connect to server.");
  }
};
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <i className="bi bi-person-circle display-4 text-primary"></i>
                  <h2 className="fw-bold mt-3">
                    Welcome Back
                  </h2>
                  <p className="text-muted">
                    Login to your ClickCart account
                  </p>
                </div>
                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}
                <form onSubmit={handleLogin}>
                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />
                  </div>
                  {/* Password */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={
                          showPassword ? "text" : "password"
                        }
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        <i
                          className={
                            showPassword
                              ? "bi bi-eye-slash"
                              : "bi bi-eye"
                          }
                        ></i>
                      </button>
                    </div>
                  </div>
                  {/* Login */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 btn-lg"
                  >
                    Login
                  </button>
                </form>
                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Don't have an account?
                  </p>
                  <Link
                    to="/register"
                    className="text-decoration-none fw-semibold"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;