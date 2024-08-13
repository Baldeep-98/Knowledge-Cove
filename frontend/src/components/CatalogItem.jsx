import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import toast from 'react-hot-toast';

const DELETE_BOOK = gql`
  mutation DeleteBook($book_id: Int!) {
    bookDelete(book_id: $book_id)
  }
`;

const CatalogItem = ({ book, onDelete }) => {
  const navigate = useNavigate();
  const [deleteBook] = useMutation(DELETE_BOOK);

  const handleClick = () => {
    navigate(`/detail/${book.book_id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/edit/${book.book_id}`);
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    try {
      const response = await deleteBook({ variables: { book_id: book.book_id } });
      console.log(response); 
      if (response.data.bookDelete) {
        toast.success('Book deleted successfully');
        onDelete(book.book_id);
      } else {
        toast.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Error deleting book');
    }
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
          <button className="itembutton">Add to Cart</button>
          <button className="edit-button" onClick={handleEditClick}>Edit</button>
          <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
