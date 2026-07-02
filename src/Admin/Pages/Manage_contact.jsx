import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Manage_contacts() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    comment: ''
  });

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/contacts`);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }

  const deletHandel = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(`http://localhost:3000/contacts/${id}`);
        toast.success('Contact deleted successfully');
        fetch();
      } catch (error) {
        console.error("Error deleting contact:", error);
        toast.error('Failed to delete contact');
      }
    }
  }

  const handleAddNewClick = () => {
    setCurrentContact(null);
    setFormValues({
      name: '',
      email: '',
      comment: ''
    });
    setShowModal(true);
  }

  const handleEditClick = (contact) => {
    setCurrentContact(contact);
    setFormValues({
      name: contact.name || '',
      email: contact.email || '',
      comment: contact.comment || ''
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
      if (currentContact) {
        // Edit existing contact
        await axios.put(`http://localhost:3000/contacts/${currentContact.id}`, {
          ...currentContact,
          ...formValues
        });
        toast.success('Contact updated successfully');
      } else {
        // Add new contact
        const newContact = {
          id: new Date().getTime().toString(),
          ...formValues
        };
        await axios.post(`http://localhost:3000/contacts`, newContact);
        toast.success('Contact added successfully');
      }
      setShowModal(false);
      fetch();
    } catch (error) {
      console.error("Error saving contact data:", error);
      toast.error('Failed to save contact data');
    }
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Contacts</h2>
        <button className="btn btn-success" onClick={handleAddNewClick}>
          Add Contact
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
                  <th>Message</th>
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
                        <td>{value.comment}</td>
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
                <h5 className="modal-title">{currentContact ? 'Edit Contact' : 'Add New Contact'}</h5>
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
                    <label className="form-label">Message / Comment</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      name="comment"
                      value={formValues.comment}
                      onChange={handleChange}
                      required
                    ></textarea>
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

export default Manage_contacts;