import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function Cart({ cart, updateQuantity, removeFromCart, clearCart }) {
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  };

  const handleCheckout = () => {
    swal("Success!", "Thank you for your purchase! Your order has been placed successfully.", "success");
    clearCart();
  };

  const subtotal = calculateSubtotal();

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="mb-4">
              <span style={{ fontSize: "5rem" }}>🛒</span>
            </div>
            <h2 className="fw-bold">Your Cart is Empty</h2>
            <p className="text-muted mb-4">
              It looks like you haven't added any products to your cart yet. Discover our latest collections now!
            </p>
            <Link to="/shop" className="btn btn-warning btn-lg fw-bold px-4 rounded-pill">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-5">Shopping Cart</h1>

      <div className="row g-4">
        {/* Cart Items List */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0">Product</th>
                      <th scope="col" className="border-0">Price</th>
                      <th scope="col" className="border-0 text-center">Quantity</th>
                      <th scope="col" className="border-0">Total</th>
                      <th scope="col" className="border-0 text-center">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              width="70"
                              height="70"
                              className="rounded border bg-light me-3"
                              style={{ objectFit: "contain" }}
                            />
                            <div>
                              <h6 className="fw-bold mb-1 text-truncate" style={{ maxWidth: "200px" }}>
                                {item.title}
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>₹{item.price}</td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-sm btn-outline-secondary px-2 py-0 fw-bold"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="mx-3 fw-bold">{item.quantity}</span>
                            <button
                              className="btn btn-sm btn-outline-secondary px-2 py-0 fw-bold"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 bg-light p-4">
            <h4 className="fw-bold mb-4">Order Summary</h4>
            
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Subtotal</span>
              <span className="fw-bold">₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Shipping</span>
              <span className="text-success fw-bold">Free</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold fs-5">Total</span>
              <span className="fw-bold fs-5 text-primary">₹{subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-warning w-100 py-3 rounded-pill fw-bold text-dark fs-6"
            >
              Proceed to Checkout
            </button>

            <Link to="/shop" className="btn btn-link w-100 text-center mt-3 text-decoration-none text-secondary small">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
