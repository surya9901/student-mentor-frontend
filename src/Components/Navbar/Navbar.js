import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import brandimage from "./zen-logo.jfif";
import "./Navbar.css";

function Navbar() {
    const [dropDown, setDropDown] = useState(false);

    const toggleOpen = () => {
        setDropDown(!dropDown);
    };

    const toggleClose = () => {
        setDropDown(false)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div>
                    <Link to="/" className="navbar-brand" onClick={toggleClose}>
                        <img alt="brand" src={brandimage} style={{ height: "30px", width: "50px" }} />
                        {" "}Student-Mentor
                    </Link>
                </div>
                <div>
                    <button className="navbar-toggler" type="button" onClick={toggleOpen} data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        {
                            dropDown ? <i className="fas fa-times" style={{ "color": "red" }}></i> : <span className="navbar-toggler-icon"></span>
                        }
                    </button>
                    <div className={`collapse navbar-collapse ${dropDown ? "show" : " "}`} id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink exact to="/" className="nav-link .active" onClick={toggleClose}>
                                Home
                            </NavLink>
                            <NavLink to="/mentors" className="nav-link .active" onClick={toggleClose}>
                                Mentors
                            </NavLink>
                            <NavLink to="/students" className="nav-link .active" onClick={toggleClose}>
                                Students
                            </NavLink>
                            <NavLink to="/multipleAssign" className="nav-link .active" onClick={toggleClose}>
                                Multiple Assign
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
