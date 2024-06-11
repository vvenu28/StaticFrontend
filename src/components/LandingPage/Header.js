import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
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
            <NavLink
              to="/LandingPage"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pricing"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink to="/Login" className="btn-login">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
