import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import alertContext from '../context/alert/alertContext';

const Login = () => {
    const {showAlert} = useContext(alertContext);
    const [credentials, setCredentials] = useState({email:"", password:""})
    const host = process.env.REACT_APP_API_HOST;
    let navigate = useNavigate();

    const loginFormSubmit = async (e)=>{
        e.preventDefault();
        const request = await fetch(`${host}/api/auth/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email:credentials.email, password:credentials.password }),
        });

        const response = await request.json();
        if(response.success == true){
            localStorage.setItem("token", response.data);
            navigate("/");
            showAlert("success","Login successfully");
        } else {
            // alert("Invalid credentials!");
            showAlert("danger","Invalid credentials!");
        }
    }

    const onChange =(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="container" style={{marginTop:"110px"}}>
            <form onSubmit={loginFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" value={credentials.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login