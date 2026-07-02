import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
function Add_categories() {

 const [formValue,setFormvalue]=useState({
       id:"",
        name:"",
        image:"",
    });
    const changeHandel=(e)=>{
      setFormvalue({...formValue,id:new Date().getTime().toString(),[e.target.name]:e.target.value});
      console.log(formValue);
    }
    const sumbitHandel=async(e)=>{
      e.preventDefault();
      try {
        await axios.post(`http://localhost:3000/categories`, formValue);
        setFormvalue({...formValue,name:"",image:""});
        toast.success("Category Added Successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to add category");
      }
    }


  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Add Category</h4>
            </div>

            <div className="card-body">

             <form action="" method='post' onSubmit={sumbitHandel}>
             
                <div className="mb-3">
                  <label className="form-label">
                    Category Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Category Name"
                    name="name"
                    value={formValue.name}
                    onChange={changeHandel}
                  />
               </div>
                <div className="mb-3">
                  <label className="form-label">
                    Category Image URL
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Image URL"
                    name="image"
                    value={formValue.image}
                    onChange={changeHandel}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Add Category
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Add_categories;