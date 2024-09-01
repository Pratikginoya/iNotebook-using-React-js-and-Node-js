import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const About = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("token")){
        navigate("/login");
    }
  }, [navigate]);

  return (
    <div
      className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold mb-4">About Us</h1>
      <div className="col-lg-9 mx-auto mt-4">
        <p className="mt-4">
          Hello! I am Pratik Ginoya. This is my React.js project, iNotebook. Through this project, I have learned advanced React.js concepts for the front-end and Node.js for the back-end.
        </p>
        <p className="mt-4">
          First, I built a backend using Node.js with MongoDB. I used MongoDB as the database and implemented key concepts such as middleware and authentication tokens. I also created RESTful APIs for user login and signup, including generating authentication tokens. Additionally, I developed an API for CRUD operations on notes.<br />
          <span>- You can find this Node.js project in the Backend folder.</span>
        </p>
        <p className="mt-4">
          After that, I completed the React.js project, which consumes the RESTful APIs from the Node.js backend. This project features advanced React.js concepts, such as context stores and custom hooks.
        </p>
        <p className="mt-4">
          In this React project, users can sign up, log in, and view their notes. They can also add, edit, or delete notes for future reference. All data is stored on the server side through the APIs.
        </p>
        <p className="mt-4">
          Thank you!
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/" className="btn btn-success">
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About