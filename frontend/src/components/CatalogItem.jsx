import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CatalogItem = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${book.book_id}`); 
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); 
    navigate(`/edit/${book.book_id}`); 
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
        <div className="container">
          <button className="itembutton">Add to Cart</button>
          <button className="edit-button" onClick={handleEditClick}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
