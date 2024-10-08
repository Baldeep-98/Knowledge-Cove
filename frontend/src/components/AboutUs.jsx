import React from "react";
import { Outlet, Link } from 'react-router-dom';
import AboutUsImage from '../assets/Images/AboutUs.png';

function AboutUs() {
  return (
    <div>
      <div className="about-head">
        <div className="text">

          <p>Welcome to Knowledge-Cove, your gateway to a world of knowledge, inspiration, and community engagement. Our mission is to foster a love for reading and lifelong learning by providing access to a diverse collection of books, digital resources, and multimedia. We offer a range of services, including research assistance, technology access, and enriching programs and events for all ages. Committed to promoting literacy, supporting education, and encouraging inclusion, Knowledge-Cove serves as a cornerstone of our community. Join us today to explore, discover, and connect with the wealth of resources and opportunities we offer.</p>

        </div>
        <div className="image">
          <img src={AboutUsImage} alt="About Us banner" />
        </div>
      </div>
      <div className="section">
        <h2>How We Started</h2>
        <p>Knowledge-Cove began as a college project, envisioned by a group of passionate students who saw the need for a community-centered library. Collaborating with local organizations and fundraising tirelessly, they transformed their vision into reality. In 2005, Knowledge-Cove opened its doors, turning a once-empty building into a vibrant space filled with books, digital resources, and a welcoming atmosphere. Today, it stands as a testament to youthful innovation, community spirit, and the enduring importance of access to information and education for all.</p>
      </div>
      <div className="contact-form-container">
        <div className="contact-form">
          <h2>Having a doubt? Ask us</h2>
          <form>
            <div className="aboutUs-form-section">
              <span>
                <label>Full Name:</label>
                <input type="text" required/>
              </span>
              <span>
                <label>Phone:</label>
                <input type="number" required/>
              </span>
            </div>

            <label>Address:</label>
            <textarea required></textarea>

            <div className="aboutUs-form-section">
              <span>
                <label>Date of Birth:</label>
                <input type="date" required/>
              </span>

              <span>
                <label>Email:</label>
                <input type="email" required/>
              </span>
            </div>

            <button type="submit">Send</button>
          </form>
          <div className="subscribe">
            <Outlet/>
            <Link to="/Services"><button className="subscribe-button">Want to join us? Subscribe now</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
