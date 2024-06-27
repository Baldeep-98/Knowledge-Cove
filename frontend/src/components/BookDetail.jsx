import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_BOOK_DETAIL = gql`
  query GetBookDetail($book_id: Int!) {
    getBook(book_id: $book_id) {
      _id
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

const BookDetail = () => {
  const { id } = useParams();
  const bookId = parseInt(id, 10);

  console.log(`Fetching details for book ID: ${bookId}`);

  const { loading, error, data } = useQuery(GET_BOOK_DETAIL, {
    variables: { book_id: bookId },
  });

  const [book, setBook] = useState(null);

  useEffect(() => {
    if (data) {
      console.log('Raw data received:', data);
      if (data.getBook) {
        console.log('Book data retrieved:', data.getBook);
        setBook(data.getBook);
      } else {
        console.log('No book data found for the given ID.');
      }
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div className="book-detail">
      <h1>{book.book_name}</h1>
      <img src={book.book_image_url} alt={book.book_name} />
      <p>Author: {book.book_author}</p>
      <p>Genre: {book.book_genre}</p>
      <p>Short Description: {book.book_shortDescription}</p>
      <p>Long Description: {book.book_longDescription}</p>
    </div>
  );
};

export default BookDetail;
