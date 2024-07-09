import React from "react";
import ServiceBanner from '../assets/Images/Account.gif';
import SubscribeBanner from '../assets/Images/Subscriber-pana.png';

function ServicesPage() {
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
          <button id="service">Get a plan</button>
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
      <div className="options">
        <div className="optioncard">
          <h3>Premium Annually</h3>
          <p>
            Get the best value with our annual plan. Enjoy all the premium
            features at a discounted rate. Ideal for dedicated learners.
          </p>
          <ul>
            <li>Access to all premium articles and resources</li>
            <li>Free entry to all webinars and workshops</li>
            <li>Personalized learning recommendations</li>
            <li>Networking opportunities</li>
            <li>Exclusive discounts on courses</li>
          </ul>
          <p>Price: $99/year</p>
          <button>Subscribe</button>
        </div>
        <div className="optioncard">
          <h3>Premium Monthly</h3>
          <p>
            Flexibility at its best. Get all the benefits of our premium
            membership with a convenient monthly payment plan.
          </p>
          <ul>
            <li>Access to all premium articles and resources</li>
            <li>Free entry to all webinars and workshops</li>
            <li>Personalized learning recommendations</li>
            <li>Networking opportunities</li>
            <li>Exclusive discounts on courses</li>
          </ul>
          <p>Price: $10/month</p>
          <button>Subscribe</button>
        </div>
        <div className="optioncard">
          <h3>Family Bundle</h3>
          <p>
            Share the knowledge. Our family bundle offers premium access for up
            to 4 family members at an unbeatable price.
          </p>
          <ul>
            <li>Access to all premium articles and resources for 4 members</li>
            <li>Free entry to all webinars and workshops</li>
            <li>Personalized learning recommendations for each member</li>
            <li>Networking opportunities</li>
            <li>Exclusive discounts on courses</li>
          </ul>
          <p>Price: $199/year</p>
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
