import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import headerLogo from "../../assets/header-logo.png";
import whyplanekrafty from "../../assets/whyplanekrafty.JPG";
import footerLogo from "../../assets/footer-logo.png";
import Footer from "./Footer";
import Header from "./Header";

const Home = () => {
  return (
    <>
      <Header />

      <main className="body">
        <div className="hero">
          {/* <img src="path/to/hero-image.jpg" alt="Hero" /> */}
          <h1>
            Aircraft Records <br />
            Organization <br />& Research
          </h1>
        </div>
        <section className="content">
          <div className="content-text">
            <div>
              Effortless records management for aircraft owners and aviation
              professionals
            </div>
          </div>
          <div className="contents">
            <div className="column">
              <h3>Owners</h3>
              <p>
                Are your maintenance records in disarray? Are you buying/selling
                an aircraft? <br />
                <br />
                Whether you just purchased the aircraft, have owned it for a
                while, or are thinking of selling it - ensuring records are
                organized and easy to review or reference improves the business
                of operating the aircraft and value it posses. <br />
                <br />A full conformity review will also be required to
                transition the aircraft for management. With extensive
                experience researching hundreds aircraft, planeKrafty is
                uniquely ready to help.
              </p>
            </div>
            <div className="column">
              <h3>Technicians</h3>
              <p>
                Want help organizing all those mx records? Is your owner about
                to sell or purchase an aircraft and you will be point man for
                maintenance issues?
                <br />
                <br />
                Managing the ongoing volume of aircraft records can be a major
                undertaking.
                <br />
                <br />
                We can provide you a system that is easy to manage, reference,
                and maintain.
                <br />
                <br />
                If you are preparing to see an aircraft through transition, the
                conformity process can be daunting. planeKrafty can help ensure
                a through conformity is processed effectively and efficiently.
              </p>
            </div>
            <div className="column">
              <h3>Maintenance Facilities</h3>
              <p>
                Do you see records that need structure and organization? Are you
                working with clients that are transitioning aircraft to new
                management and going through a conformity?
                <br />
                <br />
                We can help provide an additional service to both your
                maintenance staff and the owners of the aircraft you maintain.
                Whether it's simply getting the records into a proper organized
                state, or researching them in detail for a conformity, or both -
                planeKrafty is ready and able to help.
              </p>
            </div>
            <div className="column">
              <h3>Aircraft Brokers</h3>
              <p>
                Have your eye on an aircraft but the records are too
                disorganized? Want to ensure you know what you or your client
                are getting into regarding the true maintenance history of an
                aircraft?
                <br />
                <br />
                Would you like to increase the value of the aircraft with an
                easy return on investment?
                <br />
                <br />
                We can help improve those records and increase potential sale
                value. Additionally, we can take a deep dive into the
                maintenance records and provide detailed reporting of all the
                critical maintenance tracking items.
              </p>
            </div>
            <div className="column">
              <h3>Aircraft operators/management companies</h3>
              <p>
                Do you struggle with keeping up with the influx of records and
                being able to easily access them in more than their physical
                condition? Does it drive you mad to dig through CAMP trying to
                locate that 8110 or 337 you need? <br />
                <br />
                Are your staff stretch thin keeping up with daily operations and
                wish you could have a conformity specialist to rely on? <br />
                <br />
                planeKrafty understands these issues and can help you solve
                them.
              </p>
            </div>
          </div>
        </section>
        <section className="why-planekrafty">
          <h2 className="title">WHY PLANEKRAFTY?</h2>
          <div className="content">
            <div className="text">
              <h3>The Value of Reduced Stress & Improved Maintenance</h3>
              <p>
                Maintenance records form the foundation of an aircraft's value.
                Managing the volume of records that accumulate is a problem all
                its own. Relevant and timely access to paperwork and the details
                within is a valuable asset that is often overlooked. PlaneKrafty
                will make your records easy to reference and maintain in the
                years ahead.
              </p>
              <p>
                We are the professional aircraft maintenance records
                organization and research service you've been looking for.
              </p>
              <div className="button">
                <button className="learn-more">Learn More</button>
              </div>
            </div>
            <div className="image">
              <img src={whyplanekrafty} alt="Aircraft Maintenance" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
