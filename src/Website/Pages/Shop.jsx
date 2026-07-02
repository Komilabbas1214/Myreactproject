
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Shop({ addToCart }) {
  const location = useLocation();

  const [data, setData] = useState([]); // categories
  const [data1, setData1] = useState([]); // products
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch_cate();
    if (location.state && location.state.categoryId) {
      fetch_bycate(location.state.categoryId);
    } else {
      fetch_product();
    }
  }, [location.state]);

  const fetch_cate = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/categories`);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }

  const fetch_product = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/products`);
      setData1(res.data);
      setSelectedCategory(null);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  const fetch_bycate = async (category_id) => {
    try {
      const res = await axios.get(`http://localhost:3000/products?category_id=${category_id}`);
      setData1(res.data);
      setSelectedCategory(category_id);
    } catch (err) {
      console.error("Error fetching products by category:", err);
    }
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold">Shop Products</h1>

      <div className="row">
        {/* Categories Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-3">Categories</h5>
              <div className="list-group list-group-flush">
                <button
                  onClick={fetch_product}
                  className={`list-group-item list-group-item-action border-0 px-0 d-flex justify-content-between align-items-center ${selectedCategory === null ? 'fw-bold text-primary' : ''}`}
                >
                  <span>All Products</span>
                </button>
                {data.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => fetch_bycate(cat.id)}
                    className={`list-group-item list-group-item-action border-0 px-0 d-flex justify-content-between align-items-center ${selectedCategory === cat.id ? 'fw-bold text-primary' : ''}`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="col-md-9">
          {data1.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">No products found in this category.</h4>
            </div>
          ) : (
            <div className="row g-4">
              {data1.map((product) => (
                <div className="col-sm-6 col-lg-4" key={product.id}>
                  <div className="card h-100 shadow-sm border-0 card-hover transition-all">
                    <Link to={`/shop_single/${product.id}`} className="text-decoration-none">
                      <div style={{ height: '220px', overflow: 'hidden', background: '#f8f9fa' }} className="d-flex align-items-center justify-content-center p-3">
                        <img
                          src={product.image}
                          className="card-img-top"
                          alt={product.title}
                          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    </Link>
                    <div className="card-body d-flex flex-column">
                      <Link to={`/shop_single/${product.id}`} className="text-decoration-none text-dark">
                        <h6 className="card-title fw-bold text-truncate" title={product.title}>
                          {product.title}
                        </h6>
                      </Link>
                      <p className="card-text text-muted small flex-grow-1 text-truncate-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {product.description}
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="text-dark fw-bold fs-5">₹{product.price}</span>
                        <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={() => addToCart(product)}>
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;

