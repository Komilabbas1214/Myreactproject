import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    customers: 0,
    contacts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [catRes, prodRes, custRes, contRes] = await Promise.all([
          axios.get("http://localhost:3000/categories"),
          axios.get("http://localhost:3000/products"),
          axios.get("http://localhost:3000/customers"),
          axios.get("http://localhost:3000/contacts")
        ]);

        setStats({
          categories: catRes.data.length,
          products: prodRes.data.length,
          customers: custRes.data.length,
          contacts: contRes.data.length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="fw-bold">Admin Dashboard Overview</h2>
        {loading && <span className="spinner-border spinner-border-sm text-primary" role="status"></span>}
      </div>

      <div className="row g-4">
        {/* Categories */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0 border-start border-primary border-4 text-center py-3">
            <div className="card-body">
              <h1 className="display-4 fw-bold text-primary">{stats.categories}</h1>
              <h5 className="text-muted">Total Categories</h5>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0 border-start border-success border-4 text-center py-3">
            <div className="card-body">
              <h1 className="display-4 fw-bold text-success">{stats.products}</h1>
              <h5 className="text-muted">Total Products</h5>
            </div>
          </div>
        </div>

        {/* Customers */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0 border-start border-info border-4 text-center py-3">
            <div className="card-body">
              <h1 className="display-4 fw-bold text-info">{stats.customers}</h1>
              <h5 className="text-muted">Total Customers</h5>
            </div>
          </div>
        </div>

        {/* Inquiries / Contacts */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0 border-start border-warning border-4 text-center py-3">
            <div className="card-body">
              <h1 className="display-4 fw-bold text-warning">{stats.contacts}</h1>
              <h5 className="text-muted">Total Inquiries</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card shadow-sm border-0 mt-5">
        <div className="card-header bg-dark text-white py-3">
          <h5 className="mb-0 fw-bold">Recent Activities</h5>
        </div>

        <div className="card-body p-0">
          <ul className="list-group list-group-flush">
            <li className="list-group-item py-3 d-flex justify-content-between align-items-center">
              <span>System active and monitoring API on port 3000.</span>
              <span className="badge bg-success rounded-pill">Status OK</span>
            </li>
            <li className="list-group-item py-3">
              Manage product listings dynamically via the <strong>Products</strong> dropdown.
            </li>
            <li className="list-group-item py-3">
              Add new product categories dynamically via the <strong>Categories</strong> dropdown.
            </li>
            <li className="list-group-item py-3">
              View customer inquiries directly in the <strong>Contacts</strong> tab.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Admin;