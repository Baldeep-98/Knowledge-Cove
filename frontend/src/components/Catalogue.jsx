import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import toast from "react-hot-toast";
import CatalogItem from "./CatalogItem";
import BookFilter from "./BookFilter";

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

function CatalogPage() {
  const { error, data } = useQuery(GET_BOOK_LIST); //fetching data
  const [visibleBooks, setVisibleBooks] = useState(8); //set state to show book at initial load
  const [selectedBookType, setselectedBookType] = useState("all"); //to show the all books
  if (error) {
    toast.error("Failed to fetch books"); // to display errors
    console.error(error);
    return null;
  }

  const books = data?.BookList || []; //return data from bookList array
  const filteredBooks =
  selectedBookType === "all" ? books: books.filter((book) =>book.book_genre.toLowerCase() === selectedBookType.toLowerCase() );
  const showMoreBooks = () => setVisibleBooks((prev) => prev + 8); // to show  more books when click on button

  return (
    <div className="catalog-page">
      <h1 className="catalogue-heading">Discover Our Collection</h1>
      <h2 className="catalogue-sheading">Embark on a Literary Journey</h2>
      <div className="filter-bar">
        <label htmlFor="genre-filter">Filter Books:</label>
        <BookFilter onGenreChange={setselectedBookType} />
      </div>
      {filteredBooks.length === 0 ? (
        <p className="no-books">No books available</p> //if no book of selected booktype then show message
      ) : (
        <div className="catalog-grid">
          {filteredBooks.slice(0, visibleBooks).map((book) => (
            <CatalogItem key={book.book_id} book={book} />
          ))}
        </div>
      )}
      {visibleBooks < filteredBooks.length && (
        <div className="button-container">
        <button className="cataloguebutton" type="button" onClick={showMoreBooks}>
          Explore More Books
        </button>
      </div>
    )}
      </div>
  );
}
 
export default CatalogPage;
 