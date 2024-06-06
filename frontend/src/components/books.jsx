import React from 'react';
import BookItem from './BookItem';
import '../index.css';

function AllBooks() {
  const books = [
    { image: '/Images/book9.jpg', title: 'Book 1', Author: 'Book Author' },
    { image: '/Images/book10.jpg', title: 'Book 2', Author: 'Book Author' },
    { image: '/Images/book11.jpg', title: 'Book 3', Author: 'Book Author' },
    { image: '/Images/book12.jpg', title: 'Book 4', Author: 'Book Author' },
    { image: '/Images/book13.jpg', title: 'Book 5', Author: 'Book Author' },
    { image: '/Images/book14.jpg', title: 'Book 6', Author: 'Book Author' },
    { image: '/Images/book15.jpg', title: 'Book 7', Author: 'Book Author' },
    { image: '/Images/book16.jpg', title: 'Book 8', Author: 'Book Author' },
    { image: '/Images/book17.jpg', title: 'Book 9', Author: 'Book Author' },
    { image: '/Images/book18.jpg', title: 'Book 10', Author: 'Book Author' },
    { image: '/Images/book19.jpg', title: 'Book 9', Author: 'Book Author' },
    { image: '/Images/book20.jpg', title: 'Book 10', Author: 'Book Author' },

  ];

  return (
    <div>
      <h1 className='books-heading'>Discover Your Next Great Read</h1>
      <h2 className='sbook-heading'>Explore a World of Knowledge with Our Extensive Library Collection</h2>
      <div className="container">
        {books.map((book, index) => (
          <BookItem 
            key={index} 
            image={book.image} 
            title={book.title} 
            Author={book.Author} 
          />
        ))}
      </div>
    </div>
  );
}

export default AllBooks;
