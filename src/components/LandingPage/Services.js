import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import headerLogo from "../../assets/header-logo.png";
import whyplanekrafty from "../../assets/whyplanekrafty.JPG";
import footerLogo from "../../assets/footer-logo.png";
import Header from "./Header";
import Footer from "./Footer";

const Services = () => {
  return (
    <>
      <Header />

      <main className="body">
        <div className="services-title">
          {/* <img src="path/to/hero-image.jpg" alt="Hero" /> */}
          <h1>planeKrafty Services</h1>
        </div>
        <section className="why-planekrafty">
          <div className="content">
            <div className="text">
              <h3>Records Organization</h3>
              <p>
                Finding what you need in your maintenance records means getting
                them organized, and good organization means having a good plan
                to easily maintain the system going forward.
              </p>
              <div className="button">
                <button className="learn-more">
                  Records Organization Services
                </button>
              </div>
            </div>
            <div className="text">
              <h3>Records Research</h3>
              <p>
                Finding what you need in your maintenance records means getting
                them organized, and good organization means having a good plan
                to easily maintain the system going forward.
              </p>
              <div className="button">
                <button className="learn-more">
                  Research/conformity Services
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Services;
