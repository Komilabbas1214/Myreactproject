import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Check if email already exists
      const res = await axios.get("http://localhost:3000/admin");
      const adminUsers = res.data;
      
      const emailExists = adminUsers.some((user) => user.email.toLowerCase() === email.toLowerCase());

      if (emailExists) {
        setError("An administrator with this email address already exists.");
        setLoading(false);
        return;
      }

      // Create new admin account
      const newAdmin = {
        id: new Date().getTime().toString(),
        name: name,
        email: email,
        password: password
      };

      await axios.post("http://localhost:3000/admin", newAdmin);
      toast.success("Admin account created successfully! Please sign in.");
      navigate("/Login");
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred during registration. Please verify the API server is running.");
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
                <h4>Create Account</h4>
                <p className="text-muted">Register as a new administrator</p>
              </div>

              {error && <div className="alert alert-danger py-2 small">{error}</div>}

              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold shadow-sm mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Registering...
                    </>
                  ) : (
                    "Register Admin"
                  )}
                </button>

                <div className="text-center">
                  <p className="small mb-0 text-muted">
                    Already have an account?{" "}
                    <Link to="/Login" className="text-primary fw-bold text-decoration-none">
                      Sign In
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

export default Signup;
