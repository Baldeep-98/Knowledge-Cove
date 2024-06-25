import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import toast from 'react-hot-toast';
import CatalogItem from './CatalogItem';
import BookFilter from './BookFilter';

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

const CatalogPage = () => {
  const { loading, error, data } = useQuery(GET_BOOK_LIST);
  const [visibleBooks, setVisibleBooks] = useState(4); 

  if (loading) return <p>Loading the books...</p>;
  if (error) {
    toast.error('Failed to fetch books');
    console.error(error);
    return null;
  }

  const books = data?.BookList || [];
  const showMoreBooks = () => setVisibleBooks(prev => prev + 4);  //show 4 books when page load

  return (
    <div className="catalog-page">
      <h1 className="catalogue-heading">Discover Our Collection</h1>
      <h2 className="catalogue-sheading">Embark on a Literary Journey</h2>
      <div className="filter-bar">
        <label htmlFor="genre-filter">Filter by Genre:</label>
      <BookFilter searchName={"books"}/>
      </div>
      {books.length === 0 ? (
        <p className="no-books">No books available</p>
      ) : (
        <div className="catalog-grid">
          {books.slice(0, visibleBooks).map(book => (
            <CatalogItem key={book.book_id} book={book} />
          ))}
        </div>
      )}

      {visibleBooks < books.length && (
        <div className="button-container">
          <button id="cataloguebutton" type="button" onClick={showMoreBooks}>
            Explore More Books
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
