import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

function Add_products() {
  const [categories, setCategories] = useState([]);

  const [formValue, setFormvalue] = useState({
    title: "",
    price: "",
    description: "",
    category_id: "",
    image: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/categories"
      );
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandel = (e) => {
    setFormvalue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const sumbitHandel = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/products",
        formValue
      );

      setFormvalue({
        title: "",
        price: "",
        description: "",
        category_id: "",
        image: "",
      });

      toast.success("Product Added Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Add Product</h4>
            </div>

            <div className="card-body">
              <form onSubmit={sumbitHandel}>
                
                {/* Product Name */}
                <div className="mb-3">
                  <label className="form-label">
                    Product Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Product Name"
                    name="title"
                    value={formValue.title}
                    onChange={changeHandel}
                    required
                  />
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="form-label">
                    Category
                  </label>

                  <select
                    className="form-control"
                    name="category_id"
                    value={formValue.category_id}
                    onChange={changeHandel}
                    required
                  >
                    <option value="">
                      Select Category
                    </option>

                    {categories.map((cat) => (
                      <option
                        key={cat.id}
                        value={cat.id}
                      >
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <label className="form-label">
                    Product Price
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Product Price"
                    name="price"
                    value={formValue.price}
                    onChange={changeHandel}
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">
                    Product Description
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter Product Description"
                    name="description"
                    value={formValue.description}
                    onChange={changeHandel}
                    required
                  ></textarea>
                </div>

                {/* Image */}
                <div className="mb-3">
                  <label className="form-label">
                    Product Image URL
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Product Image URL"
                    name="image"
                    value={formValue.image}
                    onChange={changeHandel}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Add Product
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add_products;