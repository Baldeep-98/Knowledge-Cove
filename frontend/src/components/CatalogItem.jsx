import React from 'react';
import PropTypes from 'prop-types';


const CatalogItem = ({ book }) => (
  <div className="catalog-item">
    <img src={book.book_image_url} alt={book.book_name} className="book-image" />
    <h3>{book.book_name}</h3>
    <p>{book.book_author}</p>
    <p>{book.book_genre}</p>
    <p>{book.book_shortDescription}</p>
   <button>Add to Cart</button>
  </div>
);

CatalogItem.propTypes = {
  book: PropTypes.shape({
    book_image_url: PropTypes.isRequired,
    book_name: PropTypes.isRequired,
    book_author: PropTypes.isRequired,
    book_genre: PropTypes.isRequired,
    book_shortDescription: PropTypes.isRequired,
    book_longDescription: PropTypes.isRequired,
  }).isRequired,
};

export default CatalogItem;
