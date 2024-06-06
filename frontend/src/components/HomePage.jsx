import React from "react";

function HomePage() {
  return (
    <div>
      <h1>Welcome to Book Store</h1>
      <div>
        <div className="logo">
          <img src="/Images/logo.jpg" alt="logo" />
        </div>
        <div className="quote">
          <p>
            "The only thing you absolutely have to know is the location of the
            library".
          </p>
        </div>
      </div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="BookList">Book List</a></li>
        <li><a href="AddBook">Add Book</a></li>
      </ul>
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
}

export default HomePage;
