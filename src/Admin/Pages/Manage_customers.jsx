import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Manage_customers() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    image: ''
  });

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/customers`);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }

  const deletHandel = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`http://localhost:3000/customers/${id}`);
        toast.success('Customer deleted successfully');
        fetch();
      } catch (error) {
        console.error("Error deleting customer:", error);
        toast.error('Failed to delete customer');
      }
    }
  }

  const handleAddNewClick = () => {
    setCurrentCustomer(null);
    setFormValues({
      name: '',
      email: '',
      password: '',
      mobile: '',
      image: ''
    });
    setShowModal(true);
  }

  const handleEditClick = (customer) => {
    setCurrentCustomer(customer);
    setFormValues({
      name: customer.name || '',
      email: customer.email || '',
      password: customer.password || '',
      mobile: customer.mobile || '',
      image: customer.image || ''
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
      if (currentCustomer) {
        // Edit existing customer
        await axios.put(`http://localhost:3000/customers/${currentCustomer.id}`, {
          ...currentCustomer,
          ...formValues
        });
        toast.success('Customer updated successfully');
      } else {
        // Add new customer
        const newCustomer = {
          id: new Date().getTime().toString(),
          ...formValues
        };
        await axios.post(`http://localhost:3000/customers`, newCustomer);
        toast.success('Customer added successfully');
      }
      setShowModal(false);
      fetch();
    } catch (error) {
      console.error("Error saving customer data:", error);
      toast.error('Failed to save customer data');
    }
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Customers</h2>
        <button className="btn btn-success" onClick={handleAddNewClick}>
          Add Customer
        </button>
      </div>

      <div className="card shadow border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((value) => {
                    return (
                      <tr key={value.id}>
                        <td>{value.id}</td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>{value.mobile}</td>
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

      {/* React-controlled Bootstrap Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentCustomer ? 'Edit Customer' : 'Add New Customer'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
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
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mobile</label>
                    <input
                      type="text"
                      className="form-control"
                      name="mobile"
                      value={formValues.mobile}
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
  )
}

export default Manage_customers;