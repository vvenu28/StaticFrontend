import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import headerLogo from "../../assets/header-logo.png";
import whyplanekrafty from "../../assets/whyplanekrafty.JPG";
import footerLogo from "../../assets/footer-logo.png";
import Header from "./Header";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <Header />

      <main className="body">
        <div className="aboutus-title">
          {/* <img src="path/to/hero-image.jpg" alt="Hero" /> */}
          <h1>About Us</h1>
        </div>
        <section className="why-planekrafty">
          <div className="content">
            <div className="image">
              <img src={whyplanekrafty} alt="Aircraft Maintenance" />
            </div>
            <div className="text">
              <h2>Where it Began...</h2>
              <p>
                As an aircraft mechanic of more than 20 years, I have found the
                maintenance records are often an after thought. Lost in the
                shuffle of other more pressing issues, the work orders and
                8130s, 337s and supporting documentation become a jumbled mess.
                Especially if the aircraft has been sold a few times or spent
                time without a dedicated mechanic. Having a reliable and easy
                system to organize and maintain your records is critical to
                safety, reduces cost, and improves the value of an aircraft.
              </p>
            </div>
          </div>
          <div className="aboutus-content">
            <div className="aboutus-data">
              <h3>Creating Records with Structure</h3>
              <p>
                After reviewing hundreds of aircraft and their records I have
                seen countless approaches to aircraft record keeping. From that
                knowledge, I have developed an approach that will put your
                records in order, easy to find, and easy to maintain.
              </p>
            </div>
            <div className="aboutus-data">
              <h3>Conformity Research with Detailed Reporting</h3>
              <p>
                Having researched and reviewed hundreds of aircraft's records
                for conformity I am extensively familiar with where to look and
                can provide accurate and relevant reporting for your aircraft.
                Rest assured you know exactly what your aircraft's compliance
                status REALLY is with planeKrafty.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
