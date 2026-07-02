import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import img1 from '../Component/asset/gMO6qStU-Range-Malai-Mango-and-Falooda-1200x900.jpeg';
import img2 from '../Component/asset/OIP_1.webp';
import img3 from '../Component/asset/OIP.webp';
import img4 from '../Component/asset/images_2.jfif';

function Home({ addToCart }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get("http://localhost:3000/products"),
          axios.get("http://localhost:3000/categories")
        ]);
        setFeaturedProducts(prodRes.data.slice(0, 4));
        setCategories(catRes.data);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
      }
    };
    fetchData();
  }, []);

  const cleanCategoryName = (name) => {
    const trimmed = name.trim().toLowerCase();
    if (trimmed === "mens") return "Men";
    if (trimmed === "womens") return "Women";
    if (trimmed === "childs") return "Child";
    return name.trim();
  };

  return (
    <>
      {/* Hero Carousel Section */}
      <div id="heroCarousel" className="carousel slide bg-dark shadow-sm" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active" style={{ height: '420px', background: 'linear-gradient(135deg, #1e1e24 0%, #111115 100%)' }}>
            <div className="container h-100">
              <div className="row align-items-center h-100 py-4">
                <div className="col-md-7 text-white text-start ps-lg-5">
                  <h1 className="display-4 fw-bold text-warning mb-2">Fresh Mango & Falooda</h1>
                  <p className="lead text-light mb-4">Indulge in our premium range of Malai Mango and refreshing Faloodas. Handcrafted with love.</p>
                  <Link to="/shop" className="btn btn-warning btn-lg fw-bold rounded-pill px-4 shadow">
                    Order Now
                  </Link>
                </div>
                <div className="col-md-5 d-flex justify-content-center align-items-center">
                  <img src={img1} style={{ maxHeight: '320px', maxWidth: '90%', objectFit: 'contain', borderRadius: '15px' }} className="shadow-lg border border-secondary" alt="Mango Falooda" />
                </div>
              </div>
            </div>
          </div>
          {/* Slide 2 */}
          <div className="carousel-item" style={{ height: '420px', background: 'linear-gradient(135deg, #1e1e24 0%, #111115 100%)' }}>
            <div className="container h-100">
              <div className="row align-items-center h-100 py-4">
                <div className="col-md-7 text-white text-start ps-lg-5">
                  <h1 className="display-4 fw-bold text-warning mb-2">Premium Sweet Treats</h1>
                  <p className="lead text-light mb-4">Discover everyday essentials and delicious sweet delicacies at unbeatable prices.</p>
                  <Link to="/shop" className="btn btn-warning btn-lg fw-bold rounded-pill px-4 shadow">
                    Explore Shop
                  </Link>
                </div>
                <div className="col-md-5 d-flex justify-content-center align-items-center">
                  <img src={img2} style={{ maxHeight: '300px', maxWidth: '90%', objectFit: 'contain', borderRadius: '15px' }} className="shadow-lg border border-secondary" alt="Sweet Treats" />
                </div>
              </div>
            </div>
          </div>
          {/* Slide 3 */}
          <div className="carousel-item" style={{ height: '420px', background: 'linear-gradient(135deg, #1e1e24 0%, #111115 100%)' }}>
            <div className="container h-100">
              <div className="row align-items-center h-100 py-4">
                <div className="col-md-7 text-white text-start ps-lg-5">
                  <h1 className="display-4 fw-bold text-warning mb-2">Authentic Flavors</h1>
                  <p className="lead text-light mb-4">We bring you only the highest grade food items, snacks, and treats straight to you.</p>
                  <Link to="/shop" className="btn btn-warning btn-lg fw-bold rounded-pill px-4 shadow">
                    View Menu
                  </Link>
                </div>
                <div className="col-md-5 d-flex justify-content-center align-items-center">
                  <img src={img3} style={{ maxHeight: '300px', maxWidth: '90%', objectFit: 'contain', borderRadius: '15px' }} className="shadow-lg border border-secondary" alt="Authentic Flavors" />
                </div>
              </div>
            </div>
          </div>
          {/* Slide 4 */}
          <div className="carousel-item" style={{ height: '420px', background: 'linear-gradient(135deg, #1e1e24 0%, #111115 100%)' }}>
            <div className="container h-100">
              <div className="row align-items-center h-100 py-4">
                <div className="col-md-7 text-white text-start ps-lg-5">
                  <h1 className="display-4 fw-bold text-warning mb-2">Summer Delights Sale</h1>
                  <p className="lead text-light mb-4">Enjoy special discounts and get up to 50% off on selected sweet menu items.</p>
                  <Link to="/shop" className="btn btn-warning btn-lg fw-bold rounded-pill px-4 shadow">
                    Shop Deals
                  </Link>
                </div>
                <div className="col-md-5 d-flex justify-content-center align-items-center">
                  <img src={img4} style={{ maxHeight: '300px', maxWidth: '90%', objectFit: 'contain', borderRadius: '15px' }} className="shadow-lg border border-secondary" alt="Summer Delights" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Categories */}
      <section className="container py-5">
        <h2 className="text-center mb-4 fw-bold">
          Shop By Category
        </h2>

        <div className="row g-4 justify-content-center">
          {categories.map((cat) => (
            <div className="col-md-4 col-sm-6" key={cat.id}>
              <Link to="/shop" state={{ categoryId: cat.id }} className="text-decoration-none">
                <div className="card text-center shadow-sm card-hover border-0 py-4 bg-light text-dark transition-all">
                  <div className="card-body">
                    <h4 className="mb-0 fw-bold">{cleanCategoryName(cat.name)}</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container py-5">
        <h2 className="text-center mb-4 fw-bold">
          Featured Products
        </h2>

        <div className="row g-4">
          {featuredProducts.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">Loading featured products...</p>
            </div>
          ) : (
            featuredProducts.map((product) => (
              <div className="col-md-3" key={product.id}>
                <div className="card shadow-sm h-100 border-0 card-hover transition-all">
                  <Link to={`/shop_single/${product.id}`} className="text-decoration-none">
                    <div style={{ height: '200px', overflow: 'hidden', background: '#f8f9fa' }} className="d-flex align-items-center justify-content-center p-3">
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
                      <span className="text-success fw-bold">₹{product.price}</span>
                      <button className="btn btn-primary btn-sm rounded-pill px-3" onClick={() => addToCart(product)}>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Offer Banner */}
      <section className="bg-warning py-5">
        <div className="container text-center">
          <h2 className="fw-bold">Summer Sale 50% Off</h2>
          <p className="lead">Limited time offer on selected products.</p>
          <Link to="/shop" className="btn btn-dark fw-bold">
            Explore Deals
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-5 text-center">
        <h2 className="fw-bold">Subscribe To Newsletter</h2>
        <p className="text-muted">
          Get updates about new products and special offers.
        </p>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Your Email"
              />
              <button className="btn btn-success px-4">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;