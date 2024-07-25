import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';


const GET_BOOK_DETAIL = gql`
  query GetBookDetail($book_id: Int!) {
    getBook(book_id: $book_id) {
      book_id
      book_name
      book_author
      book_genre
      book_shortDescription
      book_longDescription
      book_image_url
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($bookInput: BookInput!) {
    updateBook(book: $bookInput) {
      success
      message
    }
  }
`;

const GET_BOOK_LIST = gql`
  query GetBooks {
    BookList {
      book_id
      book_name
      book_author
      book_genre
      book_shortDescription
      book_longDescription
      book_image_url
    }
  }
`;

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookId = parseInt(id, 10);
  const { loading, error, data } = useQuery(GET_BOOK_DETAIL, {
    variables: { book_id: bookId },
  });

  const [book, setBook] = useState({
    book_id: bookId,
    book_name: '',
    book_author: '',
    book_genre: '',
    book_shortDescription: '',
    book_longDescription: '',
    book_image_url: '',
  });

  const [updateBook] = useMutation(UPDATE_BOOK, {
    onCompleted: (data) => {
      if (data.updateBook.success) {
        toast.success(data.updateBook.message);
        navigate('/catalogue'); 
      } else {
        toast.error(data.updateBook.message);
      }
    },
    onError: () => {
      toast.error('Failed to update book!');
    },
    refetchQueries: [{ query: GET_BOOK_LIST }], 
  });

  useEffect(() => {
    if (data && data.getBook) {
      const { __typename, ...bookDetails } = data.getBook; 
      setBook(bookDetails);
    }
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleUpdateBookClick = async (event) => {
    event.preventDefault();
    try {
      const { __typename, ...bookInput } = book; 
      await updateBook({ variables: { bookInput } });
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Operation failed.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="edit-book-page">
      <Toaster />
      <header className="page-header">
        <h1>Edit Book</h1>
      </header>
      <div className="page-content">
        <section className="edit-book-section">
          <h2>Edit Book Details</h2>
          <form className="edit-book-form" onSubmit={handleUpdateBookClick}>
            <div className="form-group">
              <label htmlFor="book_name">Book Name:</label>
              <input type="text" id="book_name" name="book_name" value={book.book_name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="book_author">Author Name:</label>
              <input type="text" id="book_author" name="book_author" value={book.book_author} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="book_genre">Genre:</label>
              <select id="book_genre" name="book_genre" value={book.book_genre} onChange={handleChange} required>
                <option value="">Select Genre</option>
                <option value="fiction">Fiction</option>
                <option value="romance">Romance</option>
                <option value="biography">Biography</option>
                <option value="mystery">Mystery</option>
                <option value="thriller">Thriller</option>
                <option value="self-help">Self Help</option>
                <option value="fantasy">Fantasy</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="book_shortDescription">Short Description:</label>
              <input type="text" id="book_shortDescription" name="book_shortDescription" value={book.book_shortDescription} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="book_longDescription">Long Description:</label>
              <input type="text" id="book_longDescription" name="book_longDescription" value={book.book_longDescription} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="book_image_url">Book Image URL:</label>
              <input type="text" id="book_image_url" name="book_image_url" value={book.book_image_url} onChange={handleChange} required />
            </div>
            <button type="submit" className="submit-button">Update Book</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default EditBook;
