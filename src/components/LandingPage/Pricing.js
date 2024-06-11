import React from "react";
import "./Header.css";
import Header from "./Header";
import Footer from "./Footer";

const PriceList = () => {
  return (
    <>
    <Header/>
    <div className="price-list-container">
      <div className="price-list">
        <h1 className="price-list-title">PRICE LIST</h1>
        <h2 className="price-list-subtitle">planeKrafty</h2>

        <section className="price-section">
          <h3 className="section-heading">Records Organization</h3>
          <p className="section-subtitle">per box (banker's box size)</p>
          <ul>
            <li>Basic<span>$200</span></li>
            <li>Plus<span>$400</span></li>
            <li>Premium<span>$600</span></li>
          </ul>
        </section>

        <section className="price-section">
          <h3 className="section-heading">OEM Research</h3>
          <p className="section-subtitle">multiplied per year of operation</p>
          <ul>
            <li>Phenom<span>$450</span></li>
            <li>KingAir<span>$450</span></li>
            <li>Cessna<span>$500</span></li>
            <li>Gulfstream<span>$500</span></li>
            <li>Hawker<span>$650</span></li>
            <li>Dassault<span>$650</span></li>
            <li>Bombardier<span>$650</span></li>
            <li>Legacy<span>$700</span></li>
          </ul>
        </section>

        <section className="price-section">
          <h3 className="section-heading">Mod Log Book</h3>
          <ul>
            <li>ADs<span>$300/per major assy</span></li>
            <li>SBs<span>$300/per major assy</span></li>
            <li>337s/Repairs<span>$1000</span></li>
          </ul>
        </section>

        <section className="price-section">
          <h3 className="section-heading">Extras & Fees</h3>
          <ul>
            <li>Integrated Premium<span>$350/box</span></li>
            <li>Integrated Research<span>$350/box</span></li>
            <li>AC TT  5K HR<span>$1000</span></li>
            <li>AC TT  10K HR<span>$2000</span></li>
            <li>Photos<span>$800</span></li>
          </ul>
        </section>

        <div className="website-link">
          <a href="http://www.planekrafty.com">www.planekrafty.com</a>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PriceList;
