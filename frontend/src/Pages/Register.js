import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [error, setError] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
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
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Demo registration
    alert("Account created successfully!");
    navigate("/login");
  };
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <i className="bi bi-person-plus-fill display-4 text-primary"></i>
                  <h2 className="fw-bold mt-3">
                    Create Account
                  </h2>
                  <p className="text-muted">
                    Join ClickCart today
                  </p>
                </div>
                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}
                <form onSubmit={handleRegister}>
                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                    />
                  </div>
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
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        className="form-control"
                        placeholder="Create a password"
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
                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>
                    <div className="input-group">
                      <input
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        className="form-control"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                      >
                        <i
                          className={
                            showConfirmPassword
                              ? "bi bi-eye-slash"
                              : "bi bi-eye"
                          }
                        ></i>
                      </button>
                    </div>
                  </div>
                  {/* Register */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 btn-lg"
                  >
                    Create Account
                  </button>
                </form>
                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Already have an account?
                  </p>
                  <Link
                    to="/login"
                    className="text-decoration-none fw-semibold"
                  >
                    Login Here
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
export default Register;