import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CatalogItem = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${book.book_id}`);//navigate to bookdetail page when click
  };

  return (
    <div className="catalog-item" onClick={handleClick}>
      <div className="image-container">
        <img src={book.book_image_url} alt={book.book_name} className="book-image" />
      </div>
      <div className="book-details">
        <h3>{book.book_name}</h3>
        <p>{book.book_author}</p>
        <p>{book.book_genre}</p>
        <p>{book.book_shortDescription}</p>
        <Link to={`/detail/${book.book_id}`}></Link>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default CatalogItem;
