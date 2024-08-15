import React, {useRef} from "react";
import ServiceBanner from '../assets/Images/Account.gif';
import SubscribeBanner from '../assets/Images/Subscriber-pana.png';
import ServiceOptionCard from "./ServiceOptionCard";

function ServicesPage() {

  const targetRef = useRef(null);

  const handleScroll = () => {
    targetRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="membershipcontainer">
      <div className="content-row">
        <div className="content">
          <h1>Membership Page</h1>
          <h2>Expand your Knowledge at Knowledge Cove</h2>
          <h3>Why Become a Member?</h3>
          <p>
            At Knowledge Cove, we believe in the power of continuous learning
            and personal growth. By becoming a member, you gain access to a
            wealth of resources designed to expand your knowledge and enhance
            your skills. Whether you're a student, a professional, or simply a
            lifelong learner, our membership offers something for everyone.
          </p>
          <button id="service" onClick={handleScroll}> Get a plan</button>
        </div>
        <div className="contentimg">
          <img src={ServiceBanner} alt="Services banner" />
        </div>
      </div>

      <div className="benefits">
        <img src={SubscribeBanner} alt="Subscribe Banner" />
        <div className="benefits-content">
          <h3>Our Premium Subscriber Benefits</h3>
          <ul>
            <li>
              Exclusive access to a vast library of articles, e-books, and
              research papers.
            </li>
            <li>
              Free entry to our monthly webinars and expert-led workshops.
            </li>
            <li>
              Personalized learning recommendations based on your interests and
              goals.
            </li>
            <li>
              Opportunities to connect and network with other members through
              our online community.
            </li>
            <li>Discounts on premium courses and certification programs.</li>
          </ul>
        </div>
      </div>

      <h3 className="membership-options-heading">Membership Option</h3>
      <div className="options" ref={targetRef}>
        <div className="optioncard">
          <h3>Basic Plan</h3>
          <p>
            Get the best value with our basic plan. Enjoy all the premium
            features at a discounted rate. Ideal for dedicated learners.
          </p>
          <ul>
            <li>Book Borrowing: 1 books per month</li>
            <li>No Private Room Reservation</li>
            <li>Support: Low priority Email support</li>
            <li>Networking opportunities</li>
          </ul>
          <p>Free Service</p>
        </div>
        
        <ServiceOptionCard />

      </div>
    </div>
  );
}

export default ServicesPage;
