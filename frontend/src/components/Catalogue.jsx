import React, { useEffect, useState } from "react";
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
  const { loading, error, data, refetch } = useQuery(GET_BOOK_LIST);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [visibleBooks, setVisibleBooks] = useState(8);
  const [selectedBookType, setSelectedBookType] = useState("all");

  if (loading) return <p>Loading...</p>;
  if (error) {
    toast.error("Failed to fetch books");
    console.error(error);
    return null;
  }

  const books = data?.BookList || [];
  const filteredBooks =
    selectedBookType === "all"
      ? books
      : books.filter(
          (book) =>
            book.book_genre.toLowerCase() === selectedBookType.toLowerCase()
        );

  const handleDelete = (deletedBookId) => {
    refetch(); 
  };

  const showMoreBooks = () => setVisibleBooks((prev) => prev + 8);

  return (
    <div className="catalog-page">
      <h1 className="catalogue-heading">Discover Our Collection</h1>
      <h2 className="catalogue-sheading">Embark on a Literary Journey</h2>
      <div className="filter-bar">
        <label htmlFor="genre-filter">Filter Books:</label>
        <BookFilter onGenreChange={setSelectedBookType} />
      </div>
      {filteredBooks.length === 0 ? (
        <p className="no-books">No books available</p>
      ) : (
        <div className="catalog-grid">

          {filteredBooks.slice(0, visibleBooks).map((book, index) => (
            <CatalogItem
              key={`${book.book_id}-${index}`} 
              book={book}
              onDelete={handleDelete}
            />

          ))}
        </div>
      )}
      {visibleBooks < filteredBooks.length && (
        <div className="button-container">
          <button
            className="cataloguebutton"
            type="button"
            onClick={showMoreBooks}
          >
            Explore More Books
          </button>
        </div>
      )}
    </div>
  );
}

export default CatalogPage;
