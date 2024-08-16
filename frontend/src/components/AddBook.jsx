import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isWebTokenValid } from '../webTokenVerification';

const ADD_BOOK = gql`
  mutation addBook($bookInput: BookInput!) {
    addBook(book: $bookInput) {
      success
      message
    }
  }
`;

function AddBook() {
  const [book, setBook] = useState({
    book_id: '',
    book_name: '',
    book_author: '',
    book_genre: '',
    book_shortDescription: '',
    book_longDescription: '',
    book_image_url: '',  
  });

  const isValid = useSelector((state) => state.auth.isValid);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const [addBook] = useMutation(ADD_BOOK, {
    onCompleted: (data) => {
      if (data.addBook.success) {
        toast.success(data.addBook.message);
        setBook({
          book_id: '',
          book_name: '',
          book_author: '',
          book_genre: '',
          book_shortDescription: '',
          book_longDescription: '',
          book_image_url: '',
        });
      } else {
        toast.error(data.addBook.message);
      }
    },
    onError: () => {
      toast.error('Failed to Add Book!');
    }
  });


  if (!isValid && !isWebTokenValid()) {
    return <Navigate to="/login" />;
  }

  if (isValid && !isAdmin){
    return <Navigate to="/home" />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBook(prevBook => ({
        ...prevBook,
        book_image_url: reader.result
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddBookClick = async (event) => {
    event.preventDefault();
    try {
      const bookInput = { ...book, book_id: parseInt(book.book_id, 10) }; 
      await addBook({ variables: { bookInput } });
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error('Operation failed.');
    }
  };

  return (
    <div className="admin-dashboard">
      <Toaster />
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>
      <div className="dashboard-content">
        <section className="upload-book-section">
          <h2>Upload New Book</h2>
          <form className="upload-book-form" onSubmit={handleAddBookClick}>
            <div className="form-group">
              <label htmlFor="book_id">Book ID:</label>
              <input type="number" id="book_id" name="book_id" value={book.book_id} onChange={handleChange} required />
            </div>
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
              <label htmlFor="book_image_url">Book Image:</label>
              <input type="file" id="book_image_url" name="book_image_url" accept="image/*" onChange={handleFileChange} required />
            </div>
            <button type="submit" className="submit-button">Add Book</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AddBook;
