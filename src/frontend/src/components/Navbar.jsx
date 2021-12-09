import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.png";
import "../styles/Navbar.css"

const Navbar = () => {
    return (
        <header className="header header-container">
        <Link to="/" className="logo-content-wrapper" >
          <img src={logo} alt="Employee Logo" className="logo"/>
          <div className="logo-text-wrapper">
            <p className="logo-text">Employee</p>
            <p className="logo-text logo-text-color">Payroll</p>
          </div>
        </Link>
      </header>
    )
}

export default Navbar
