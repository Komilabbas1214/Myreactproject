import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CustomerSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState("");
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
      // Fetch existing customers to check email uniqueness
      const res = await axios.get("http://localhost:3000/customers");
      const customers = res.data;

      const emailExists = customers.some(
        (c) => c.email.toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        setError("A customer account with this email address already exists.");
        setLoading(false);
        return;
      }

      // Default avatar if none provided
      const finalImage = image.trim() || `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(name)}`;

      const newCustomer = {
        id: new Date().getTime().toString(),
        name,
        email,
        mobile,
        image: finalImage,
        password
      };

      await axios.post("http://localhost:3000/customers", newCustomer);
      toast.success("Account created successfully! Please log in.");
      navigate("/customer-login");
    } catch (err) {
      console.error("Customer signup error:", err);
      setError("An error occurred during sign up. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5" style={{ background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)", minHeight: "100vh" }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6 col-lg-5 col-xl-4 my-4">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <span className="fs-1">🛍️</span>
                <h2 className="fw-bold mt-2 text-dark">Create Account</h2>
                <p className="text-muted">Sign up to start shopping with Akart</p>
              </div>

              {error && <div className="alert alert-danger py-2 small text-center">{error}</div>}

              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label className="form-label fw-semibold small text-muted">Full Name</label>
                  <input
                    type="text"
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold small text-muted">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-md rounded-3"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold small text-muted">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold small text-muted">Avatar Image URL (Optional)</label>
                  <input
                    type="url"
                    className="form-control form-control-md rounded-3"
                    placeholder="https://example.com/avatar.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold small text-muted">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-md rounded-3"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold small text-muted">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control form-control-md rounded-3"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                      Signing Up...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-3">
                  <p className="small mb-0 text-muted">
                    Already have an account?{" "}
                    <Link to="/customer-login" className="text-warning fw-bold text-decoration-none">
                      Login
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

export default CustomerSignup;
