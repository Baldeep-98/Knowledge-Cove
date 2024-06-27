import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

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
  }`;

const BookDetail = () => {
  const { id } = useParams();
  const bookId = parseInt(id);

  console.log(`Fetching details for book ID: ${bookId}`);

  const { loading, error, data } = useQuery(GET_BOOK_DETAIL, {  variables: { book_id: bookId },});//fetching book detail based on bookId

  const [book, setBook] = useState(null);

  useEffect(() => {
    if (data) { 
      console.log("book received", data);
      if (data.getBook) {
        console.log("Book data retrieved:", data.getBook); 
        setBook(data.getBook);//updating book state after book fetch
      } else {
        console.log("No book data found for  ID.");
      }
    }
  }, [data]);
  if (!book) return <p>Book not found</p>;
  return (
    <div className="book-detail">
       <div className="book-image-container">
        <img
          src={book.book_image_url}
          alt={book.book_name}
          className="book-image"
        />
      </div>
      <div className="book-info">
        <h1>{book.book_name}</h1>
        <p><strong>Author:</strong> {book.book_author}</p>
        <p><strong>Genre:</strong> {book.book_genre}</p>
        <p><strong>Short Description:</strong> {book.book_shortDescription}</p>
        <p><strong>Long Description: </strong>{book.book_longDescription}</p>
        <button>Add To Cart</button>
      </div>
     
    </div>
  );
};

export default BookDetail;
