import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const CatalogItem = ({ book }) => {
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleClick = () => {
    if(!isAdmin)
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
        <div className="container">
          { isAdmin &&
            <button className="edit-button" onClick={handleEditClick}>Edit</button>
          }
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
