import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Shop_single({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch current product
        const prodRes = await axios.get(`http://localhost:3000/products/${id}`);
        const productData = prodRes.data;
        setProduct(productData);

        // Fetch category name
        if (productData.category_id) {
          try {
            const catRes = await axios.get(`http://localhost:3000/categories/${productData.category_id}`);
            setCategory(catRes.data);
          } catch (catErr) {
            console.error("Error fetching category:", catErr);
          }

          // Fetch related products (same category, excluding current product)
          try {
            const relatedRes = await axios.get(`http://localhost:3000/products?category_id=${productData.category_id}`);
            const filtered = relatedRes.data.filter(p => p.id !== productData.id).slice(0, 4);
            setRelatedProducts(filtered);
          } catch (relErr) {
            console.error("Error fetching related products:", relErr);
          }
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details. It may not exist.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
        <div className="d-flex justify-content-center align-items-center h-100 mt-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <p className="mt-3 text-muted">Loading product details, please wait...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
        <div className="mt-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="text-danger mb-3" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
          </svg>
          <h2 className="fw-bold">Product Not Found</h2>
          <p className="text-muted mb-4">{error || "We couldn't find the product you're looking for."}</p>
          <Link to="/shop" className="btn btn-primary rounded-pill px-4">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light py-5">
      <div className="container">
        {/* Breadcrumbs */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/shop" className="text-decoration-none">Shop</Link></li>
            {category && (
              <li className="breadcrumb-item">
                <Link to="/shop" state={{ categoryId: category.id }} className="text-decoration-none">
                  {category.name}
                </Link>
              </li>
            )}
            <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
          </ol>
        </nav>

        {/* Product Detail Card */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5">
          <div className="row g-0">
            {/* Image Column */}
            <div className="col-md-6 bg-white d-flex align-items-center justify-content-center p-4 p-lg-5" style={{ minHeight: '400px' }}>
              <div className="position-relative w-100 text-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid rounded-3 transition-all"
                  style={{ maxHeight: '420px', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            </div>

            {/* Info Column */}
            <div className="col-md-6 d-flex flex-column justify-content-center p-4 p-lg-5 border-start">
              {category && (
                <span className="badge bg-warning text-dark align-self-start mb-2 px-3 py-2 rounded-pill fw-bold text-uppercase" style={{ fontSize: '0.8rem' }}>
                  {category.name}
                </span>
              )}

              <h1 className="fw-bold text-dark mb-2">{product.title}</h1>

              {/* Rating stars */}
              <div className="d-flex align-items-center mb-3">
                <div className="text-warning me-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill me-1" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-muted small">(4.8 / 5.0 Rating)</span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="fs-2 fw-bold text-success">₹{product.price}</span>
                <span className="text-muted ms-2" style={{ textDecoration: 'line-through' }}>₹{(parseFloat(product.price) * 1.25).toFixed(0)}</span>
                <span className="badge bg-success-subtle text-success ms-2 rounded-pill px-2 py-1" style={{ fontSize: '0.85rem' }}>20% OFF</span>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h5 className="fw-bold text-dark mb-2">Description</h5>
                <p className="text-muted lh-base">{product.description || "Indulge in our premium quality sweet delicacies. Made from the freshest ingredients to guarantee a rich and delicious flavor with every single bite."}</p>
              </div>

              {/* Add to Cart CTA */}
              <div className="d-flex align-items-center gap-3 mb-4 pt-2">
                <button
                  onClick={() => addToCart(product)}
                  className="btn btn-primary btn-lg rounded-pill px-4 py-2.5 d-flex align-items-center gap-2 shadow-sm transition-all"
                  style={{ minWidth: '200px' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-plus" viewBox="0 0 16 16">
                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                  Add To Cart
                </button>
              </div>

              <hr className="text-muted my-3" />

              {/* Service Badges */}
              <div className="row g-2 text-center text-md-start">
                <div className="col-4">
                  <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                    <div className="bg-primary-subtle text-primary p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                      </svg>
                    </div>
                    <span className="small fw-semibold text-muted" style={{ fontSize: '0.8rem' }}>Free Shipping</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                    <div className="bg-success-subtle text-success p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-4zM8 3c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5v4c0 .828.448 1.5 1 1.5s1-.672 1-1.5V3zm-5 .5C3 2.672 2.104 2 1 2S0 2.672 0 3.5v4C0 8.328.896 9 2 9s2-.672 2-1.5v-4z"/>
                      </svg>
                    </div>
                    <span className="small fw-semibold text-muted" style={{ fontSize: '0.8rem' }}>100% Safe</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                    <div className="bg-danger-subtle text-danger p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                      </svg>
                    </div>
                    <span className="small fw-semibold text-muted" style={{ fontSize: '0.8rem' }}>Original Quality</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-5">
            <h3 className="fw-bold text-dark mb-4">Related Products</h3>
            <div className="row g-4">
              {relatedProducts.map((prod) => (
                <div className="col-6 col-md-3" key={prod.id}>
                  <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden card-hover transition-all">
                    <Link to={`/shop_single/${prod.id}`} className="text-decoration-none">
                      <div style={{ height: '180px', overflow: 'hidden', background: '#fff' }} className="d-flex align-items-center justify-content-center p-3">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="img-fluid"
                          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    </Link>
                    <div className="card-body d-flex flex-column bg-white">
                      <Link to={`/shop_single/${prod.id}`} className="text-decoration-none text-dark">
                        <h6 className="card-title fw-bold text-truncate mb-1" title={prod.title}>
                          {prod.title}
                        </h6>
                      </Link>
                      <span className="text-success fw-bold mt-auto">₹{prod.price}</span>
                      <button
                        onClick={() => addToCart(prod)}
                        className="btn btn-outline-primary btn-sm rounded-pill mt-2 w-100"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop_single;
