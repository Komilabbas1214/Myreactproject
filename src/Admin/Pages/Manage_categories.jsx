import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Manage_categories() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    image: ''
  });

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/categories`);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const deletHandel = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:3000/categories/${id}`);
        toast.success('Category deleted successfully');
        fetch();
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error('Failed to delete category');
      }
    }
  }

  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setFormValues({
      name: category.name || '',
      image: category.image || ''
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
      if (currentCategory) {
        await axios.put(`http://localhost:3000/categories/${currentCategory.id}`, {
          ...currentCategory,
          ...formValues
        });
        toast.success('Category updated successfully');
        setShowModal(false);
        fetch();
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error('Failed to update category');
    }
  }

  return (
    <div className="container py-5">

      <h2 className="mb-4">
        Manage Categories
      </h2>

      <div className="card shadow">
        <div className="card-body">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value) => (
                <tr key={value.id}>
                  <td>{value.id}</td>
                  <td>{value.name}</td>
                  <td>
                    {value.image ? (
                      <img src={value.image} width="100px" height="100px" style={{ objectFit: 'cover' }} className="rounded border" alt={value.name} />
                    ) : (
                      <div className="bg-secondary text-white rounded d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                        No Image
                      </div>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(value)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => deletHandel(value.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Category Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Category</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image URL</label>
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
  );
}

export default Manage_categories;