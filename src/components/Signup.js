import React, { useContext, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';

const Signup = () => {
  const {showAlert} = useContext(alertContext);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", con_password: "" });
  const host = process.env.REACT_APP_API_HOST;
  const { name, email, password } = credentials;
  const navigate = useNavigate();

  const signupFormSubmit = async (e) => {
    e.preventDefault();
    const request = await fetch(`${host}/api/auth/createNewUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password }),
    });

    const response = await request.json();
    if(response.success == true){
      localStorage.setItem("token", response.data);
      navigate("/");
      showAlert("success","Signup & Login successfully");
    } else {
      // alert("Invalid credentials!");
      showAlert("danger","Error: "+response.data);
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value});
  }


  return (
    <div className="container" style={{marginTop:"110px"}}>
      <form onSubmit={signupFormSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" placeholder="Enter name" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="con_password" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="con_password" name="con_password" placeholder="Re-enter password" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup