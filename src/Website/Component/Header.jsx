import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header({ cart }) {
  const [customer, setCustomer] = useState(null);
  const cartCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  useEffect(() => {
    const checkCustomer = () => {
      const stored = localStorage.getItem("customer");
      if (stored) {
        try {
          setCustomer(JSON.parse(stored));
        } catch (e) {
          console.error("Error parsing customer session:", e);
        }
      } else {
        setCustomer(null);
      }
    };

    checkCustomer();

    // Listen to storage events to sync user login/logout instantly
    window.addEventListener("storage", checkCustomer);
    return () => {
      window.removeEventListener("storage", checkCustomer);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("customer");
    sessionStorage.removeItem("uid");
    setCustomer(null);
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold text-warning" to="/">
          🛒 Akart
        </Link>

        <div className="navbar-nav ms-auto align-items-center">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/shop">Shop</Link>
          
          <Link className="nav-link text-white ms-2 position-relative btn btn-outline-warning btn-sm py-1 px-3 d-flex align-items-center" to="/cart">
            <span className="me-1">Cart</span>
            {cartCount > 0 ? (
              <span className="badge bg-danger rounded-pill ms-1">{cartCount}</span>
            ) : (
              <span className="badge bg-secondary rounded-pill ms-1">0</span>
            )}
          </Link>

          {customer ? (
            <>
              <Link className="nav-link text-warning ms-3 fw-semibold" to="/customer-page" title="View Profile">
                👤 Hi, {customer.name.split(" ")[0]}
              </Link>
              <button 
                className="btn btn-outline-danger btn-sm ms-2 py-1 px-2 rounded-pill fw-semibold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link ms-3" to="/customer-login">Login</Link>
              <Link className="nav-link text-warning" to="/customer-signup">Register</Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Header;