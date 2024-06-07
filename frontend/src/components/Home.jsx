import React from "react";
import { Link } from 'react-router-dom';
import LibraryHome from '../assets/images/home.jpg';
import HomeBanner from '../assets/images/Library-home.png';
import SlideImage1 from '../assets/images/slide1.jpg';
import SlideImage2 from '../assets/images/slide2.jpg';
import SlideImage3 from '../assets/images/slide3.jpg';
import SlideImage4 from '../assets/images/slide4.jpg';
import SlideImage5 from '../assets/images/slide5.jpg';
import SlideImage6 from '../assets/images/slide6.jpg';
import SlideImage7 from '../assets/images/slide7.jpg';
import SlideImage8 from '../assets/images/slide8.jpg';
import SlideImage9 from '../assets/images/slide9.jpg';
import SlideImage10 from '../assets/images/slide10.jpg';



function Home() {
  return (
    <div>
      <div className="hero">
        <div className="hero-image">
          <img src={LibraryHome} alt="Library banner" />
          <div className="hero-text">
            <h1>Welcome to Knowledge Cove</h1>
            <Link to="/Signup"></Link>
            <button type="button">Sign In</button>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="services">
          <h2>Our Services</h2>
          <div className="service-item">
            <h3>Book Issuance</h3>
            <p>Borrow books easily and quickly.</p>
            <button type="button" className="learn-more">Learn More</button>
            <div className="accordion">
              <p><b>Members can easily issue a book by selecting it from our catalog and 
                presenting their membership card at the checkout desk. </b></p>
            </div>
          </div>
          <div className="service-item">
            <h3>Room Booking</h3>
            <p>Reserve rooms for study or meetings.</p>
            <button type="button" className="learn-more">Learn More</button>
            <div className="accordion">
              <p><b>To book a room, members can visit our online reservation system or speak with our 
                front desk staff. Simply choose an available time slot.</b></p>
            </div>
          </div>
          <div className="service-item">
            <h3>Our Plans</h3>
            <p>Explore our membership plans.</p>
            <button type="button" className="learn-more">Learn More</button>
            <div className="accordion">
              <p><b>Learn about the benefits and costs of our various membership plans.</b></p>
            </div>
          </div>
        </div>
        
        <div className="slideshow-container">
          <div className="slideshow">
            <img src={SlideImage1} alt="Slide 1" />
            <img src={SlideImage2} alt="Slide 2" />
            <img src={SlideImage3} alt="Slide 3" />
            <img src={SlideImage4} alt="Slide 4" />
            <img src={SlideImage5} alt="Slide 5" />
            <img src={SlideImage6} alt="Slide 6" />
            <img src={SlideImage7} alt="Slide 7" />
            <img src={SlideImage8} alt="Slide 8" />
            <img src={SlideImage9} alt="Slide 9" />
            <img src={SlideImage10} alt="Slide 10" />
           
          </div>
        </div>

        <div className="motivation">
          <h2>What Motivates Us</h2>
          <div className="motivation-content">
            <img src={HomeBanner} alt="Library banner" className="floating-image" />
            <div className="motivation-text">
              <p>Our library is driven by the passion for spreading knowledge and fostering a love for reading in our community. We believe in the power of books to transform lives, inspire innovation, and create a more informed and empathetic society.</p>
              <p>We are committed to providing a welcoming and inclusive space for all, where everyone can access the resources they need to learn, grow, and connect with others. Our dedicated staff and diverse collections are here to support you on your journey of discovery.</p>
            </div>
          </div>
        </div>
        <div className="reviews">
          <h2>What People Think About Us</h2>
          <div className="review-cards">
            <div className="review-card">
              <h3>John Doe</h3>
              <p>"The library offers a fantastic range of books and the staff are always helpful. It's my favorite place to read and study."</p>
            </div>
            <div className="review-card">
              <h3>Jane Smith</h3>
              <p>"I love the community events hosted by the library. It's a great place to meet new people and learn new things."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
