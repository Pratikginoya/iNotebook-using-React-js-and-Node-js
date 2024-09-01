import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext';

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const { showAlert } = useContext(alertContext);

    useEffect(() => {
        // console.log(location);
    }, [location]);

    const logoutClick =()=>{
        localStorage.removeItem("token");
        navigate("/login");
        showAlert("success", "Logout sucessfully")
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand mx-5" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem("token") ? <div><Link className="btn btn-success mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link></div> : <button className="btn btn-warning mx-1" type="button" onClick={logoutClick}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar