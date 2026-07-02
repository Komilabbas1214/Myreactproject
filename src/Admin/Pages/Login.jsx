import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:3000/admin");
      const adminUsers = res.data;
      
      const matchedUser = adminUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        sessionStorage.setItem("admin", JSON.stringify(matchedUser));
        sessionStorage.setItem("aid", matchedUser.id);
        navigate("/admin");
      } else {
        setError("Invalid email address or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred while signing in. Please check if the API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-light">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}
      >
        <div className="col-md-5 col-lg-4">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h1 className="fw-bold text-primary">Admin Panel</h1>
                <h4>Welcome Back!</h4>
                <p className="text-muted">Please sign in to continue</p>
              </div>

              {error && <div className="alert alert-danger py-2 small">{error}</div>}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between mb-3 align-items-center">
                  <div className="small">
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      id="rememberMe"
                    />
                    <label htmlFor="rememberMe" className="form-check-label">Remember Me</label>
                  </div>
                  <a href="#" className="text-decoration-none small">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="text-center mt-3">
                  <p className="small mb-0 text-muted">
                    Don't have an admin account?{" "}
                    <Link to="/Admin_signup" className="text-primary fw-bold text-decoration-none">
                      Register Here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;