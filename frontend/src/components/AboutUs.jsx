import React from "react";
import AboutUsImage from '../assets/images/AboutUs.png';

function AboutUs() {
  return (
    <div>
      <div className="about-head">
        <div className="text">
          <p>Here is some information about our Library...</p>
        </div>
        <div className="image">
          <img src={AboutUsImage} alt="About Us banner" />
        </div>
      </div>
      <div className="section">
        <h2>How We Started</h2>
        <p>Here is the story of how we started...</p>
      </div>
      <div className="contact-form">
        <h2>Having a doubt? Ask us</h2>
        <div className="aboutUs-section">
          <form>
            <div className="aboutUs-form-section">
              <span>
                <label>Full Name:</label>
                <input type="text" />
              </span>
              <span>
                <label>Phone:</label>
                <input type="number" />
              </span>
            </div>

            <label>Address:</label>
            <textarea></textarea>

            <div className="aboutUs-form-section">
              <span>
                <label>Date of Birth:</label>
                <input type="date" />
              </span>

              <span>
                <label>Email:</label>
                <input type="email" />
              </span>
            </div>

            <button type="submit">Register</button>
          </form>
        </div>
        <div className="subscribe">
          <button className="subscribe-button">Want to join us? Subscribe now</button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
