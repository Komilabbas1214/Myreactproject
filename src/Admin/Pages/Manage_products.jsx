import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';

function Manage_products() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    price: "",
    description: "",
    category_id: "",
    image: "",
  });

  useEffect(() => {
    fetch();
    fetchCategories();
  }, []);

  const fetch = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/products`);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const deletHandel = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        toast.success('Product deleted successfully');
        fetch();
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error('Failed to delete product');
      }
    }
  }

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setFormValues({
      title: product.title || "",
      price: product.price || "",
      description: product.description || "",
      category_id: product.category_id || "",
      image: product.image || "",
    });
    setShowModal(true);
  }

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentProduct) {
        await axios.put(`http://localhost:3000/products/${currentProduct.id}`, {
          ...currentProduct,
          ...formValues
        });
        toast.success('Product updated successfully');
        setShowModal(false);
        fetch();
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error('Failed to update product');
    }
  }

  const getCategoryName = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.name : catId;
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>
      </div>

      <div className="card shadow">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Image</th>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((value) => {
                    return (
                      <tr key={value.id}>
                        <td>
                          {value.image ? (
                            <img src={value.image} width="120px" height="120px" style={{ objectFit: 'contain' }} className="rounded border bg-light" alt={value.title} />
                          ) : (
                            <div className="bg-secondary text-white rounded d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                              No Image
                            </div>
                          )}
                        </td>
                        <td>{value.id}</td>
                        <td>{value.title}</td>
                        <td>₹{value.price}</td>
                        <td>{getCategoryName(value.category_id)}</td>
                        <td>
                          <button className='btn btn-primary btn-sm me-2' onClick={() => handleEditClick(value)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => deletHandel(value.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formValues.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      name="category_id"
                      value={formValues.category_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Product Price</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name="price"
                      value={formValues.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Product Description</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      name="description"
                      value={formValues.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Product Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="image"
                      value={formValues.image}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Manage_products;