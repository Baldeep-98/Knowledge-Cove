import React from 'react';
import PropTypes from 'prop-types';

const CatalogItem = ({ book_image_url, book_name, book_author, book_genre, book_shortDescription }) => (
  <div className="catalog-item">
    <img src={book_image_url} alt={book_name} className="book-image" />
    <h3>{book_name}</h3>
    <p>{book_author}</p>
    <p>{book_genre}</p>
    <p>{book_shortDescription}</p>
    <button>Add to Cart</button>
  </div>
);

CatalogItem.propTypes = {
  book_image_url: PropTypes.string,
  book_name: PropTypes.string,
  book_author: PropTypes.string,
  book_genre: PropTypes.string,
  book_shortDescription: PropTypes.string,
};

export default CatalogItem;
