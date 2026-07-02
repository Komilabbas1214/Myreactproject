import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CustomerLogin() {
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
      const res = await axios.get("http://localhost:3000/customers");
      const customers = res.data;

      const matchedCustomer = customers.find(
        (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
      );

      if (matchedCustomer) {
        localStorage.setItem("customer", JSON.stringify(matchedCustomer));
        sessionStorage.setItem("uid", matchedCustomer.id);
        toast.success(`Welcome back, ${matchedCustomer.name}!`);
        
        // Dispatch custom storage event to notify header component of storage changes immediately
        window.dispatchEvent(new Event("storage"));
        
        navigate("/");
      } else {
        setError("Invalid email address or password.");
      }
    } catch (err) {
      console.error("Customer login error:", err);
      setError("An error occurred during sign in. Check if the API server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5" style={{ background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)", minHeight: "100vh" }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-5 col-lg-4 my-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <span className="fs-1">🔑</span>
                <h2 className="fw-bold mt-2 text-dark">Customer Login</h2>
                <p className="text-muted">Sign in to your Akart account</p>
              </div>

              {error && <div className="alert alert-danger py-2 small text-center">{error}</div>}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fw-semibold small text-muted">Email Address</label>
                  <input
                    type="email"
                    className="form-control rounded-3"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold small text-muted">Password</label>
                  <input
                    type="password"
                    className="form-control rounded-3"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100 py-2.5 fw-bold rounded-3 shadow-sm mb-3 text-dark"
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
                    Don't have an account?{" "}
                    <Link to="/customer-signup" className="text-warning fw-bold text-decoration-none">
                      Create Account
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

export default CustomerLogin;
