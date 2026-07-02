   import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
function Contact() {
   const [formValue,setFormvalue]=useState({
          id:"",
        name:"",
        email:"",
        comment:"",
    });
    const changeHandel=(e)=>{
      setFormvalue({...formValue,id:new Date().getTime().toString(),[e.target.name]:e.target.value});
      console.log(formValue);
    }
    const submitHandel = async (e) => {
        e.preventDefault(); // prevent reload page due to form submit
        try {
            await axios.post(`http://localhost:3000/contacts`, formValue);
            setFormvalue({ ...formValue, name: "", email: "", comment: ""});
            swal("Success!", "Inquiry Inserted Successfully!", "success");
        } catch (error) {
            console.error(error);
            swal("Error!", "Failed to insert inquiry. Please try again.", "error");
        }
        return false;
    }
  return (
    <div className="container py-5">

      <h1 className="text-center mb-4">
        Contact Us
      </h1>

       <form className="col-md-9 m-auto" method="post" role="form" onSubmit={submitHandel}>
    
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Name"
          name="name"
          value={formValue.name}
          onChange={changeHandel}
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter Email"
          name="email"
          value={formValue.email}
          onChange={changeHandel}
        />

        <textarea
          className="form-control mb-3"
          rows="5"
          placeholder="Message"
          name="comment"
          value={formValue.comment}
          onChange={changeHandel}
        ></textarea>

        <button className="btn btn-success">
          Send Message
        </button>

      </form>

    </div>
  );
}

export default Contact;