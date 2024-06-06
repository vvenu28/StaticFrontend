import React from "react";
import "./Header.css";
import footerLogo from "../../assets/footer-logo.png";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="image">
            <img src={footerLogo} alt="footer-logo" />
          </div>
          <div className="footer-desc">
            <a href="mailto:contact@planekrafty.com">contact@planekrafty.com</a>
            <p>513-787-1799</p>
            <p>Cincinnati, OH</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
