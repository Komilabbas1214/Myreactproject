import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CustomerPage() {
  const [customer, setCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    if (!storedCustomer) {
      toast.warning("Please sign in to view your profile.");
      navigate("/customer-login");
      return;
    }

    const parsedCustomer = JSON.parse(storedCustomer);
    setCustomer(parsedCustomer);
    setName(parsedCustomer.name || "");
    setMobile(parsedCustomer.mobile || "");
    setImage(parsedCustomer.image || "");

    // Load cart items count
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        const count = parsedCart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      } catch (e) {
        console.error(e);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("customer");
    sessionStorage.removeItem("uid");
    toast.success("Successfully logged out.");
    
    // Dispatch custom storage event to notify header component of storage changes immediately
    window.dispatchEvent(new Event("storage"));
    
    navigate("/");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!customer) return;

    setLoading(true);
    try {
      const updatedCustomer = {
        ...customer,
        name,
        mobile,
        image: image || `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(name)}`
      };

      await axios.put(`http://localhost:3000/customers/${customer.id}`, updatedCustomer);
      localStorage.setItem("customer", JSON.stringify(updatedCustomer));
      setCustomer(updatedCustomer);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
      
      // Dispatch storage event to update name in Header immediately
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Error updating customer:", err);
      toast.error("Failed to update profile. Make sure server is running.");
    } finally {
      setLoading(false);
    }
  };

  if (!customer) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Welcome Banner */}
          <div className="card border-0 shadow-sm mb-4 text-white overflow-hidden rounded-4" style={{ background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)" }}>
            <div className="card-body p-5 d-md-flex align-items-center justify-content-between">
              <div>
                <span className="badge bg-warning text-dark mb-2 fw-semibold px-3 py-1.5 rounded-pill">Akart Customer Portal</span>
                <h1 className="fw-bold mb-1">Hello, {customer.name}!</h1>
                <p className="mb-0 opacity-75">Manage your personal settings, cart, and profile information.</p>
              </div>
              <div className="mt-4 mt-md-0 text-md-end">
                <button className="btn btn-light fw-bold text-primary px-4 py-2 rounded-pill shadow-sm" onClick={() => navigate("/shop")}>
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {/* Sidebar Profile Card */}
            <div className="col-md-5">
              <div className="card border-0 shadow-sm text-center rounded-4 p-4 h-100">
                <div className="d-flex justify-content-center mb-3">
                  <img
                    src={customer.image || "https://avatar.iran.liara.run/public/boy"}
                    alt={customer.name}
                    className="rounded-circle border shadow-sm"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "https://avatar.iran.liara.run/public/boy";
                    }}
                  />
                </div>
                <h4 className="fw-bold mb-1">{customer.name}</h4>
                <p className="text-muted small mb-3">{customer.email}</p>
                <div className="bg-light p-3 rounded-3 mb-4">
                  <div className="row g-0 text-center">
                    <div className="col border-end">
                      <div className="fw-bold text-primary fs-5">{cartCount}</div>
                      <div className="text-muted small">Cart Items</div>
                    </div>
                    <div className="col">
                      <div className="fw-bold text-success fs-5">Active</div>
                      <div className="text-muted small">Status</div>
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-outline-danger py-2 rounded-3 fw-semibold" onClick={handleLogout}>
                    Logout Account
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Information/Edit Card */}
            <div className="col-md-7">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                  <h4 className="fw-bold mb-0 text-dark">Profile Details</h4>
                  {!isEditing && (
                    <button className="btn btn-sm btn-outline-primary px-3 rounded-pill fw-semibold" onClick={() => setIsEditing(true)}>
                      ✏️ Edit Profile
                    </button>
                  )}
                </div>

                {!isEditing ? (
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="text-muted small fw-semibold d-block mb-1">Full Name</label>
                      <p className="fs-5 text-dark fw-medium mb-0">{customer.name}</p>
                    </div>
                    <div className="col-12">
                      <label className="text-muted small fw-semibold d-block mb-1">Email Address</label>
                      <p className="fs-5 text-dark fw-medium mb-0">{customer.email}</p>
                    </div>
                    <div className="col-12">
                      <label className="text-muted small fw-semibold d-block mb-1">Mobile Number</label>
                      <p className="fs-5 text-dark fw-medium mb-0">{customer.mobile || "Not Provided"}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                      <label className="form-label text-muted small fw-semibold">Full Name</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted small fw-semibold">Mobile Number</label>
                      <input
                        type="tel"
                        className="form-control rounded-3"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-muted small fw-semibold">Avatar Image URL</label>
                      <input
                        type="url"
                        className="form-control rounded-3"
                        placeholder="https://example.com/image.jpg"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary px-4 py-2 rounded-3 fw-bold" disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                      <button type="button" className="btn btn-outline-secondary px-4 py-2 rounded-3 fw-bold" onClick={() => setIsEditing(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;
