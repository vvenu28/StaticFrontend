import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import headerLogo from "../../assets/header-logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={headerLogo} alt="planeKrafty" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/LandingPage">Home</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/Login" className="btn-login">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
