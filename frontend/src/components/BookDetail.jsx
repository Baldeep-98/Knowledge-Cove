import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { isWebTokenValid } from '../webTokenVerification';


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

const GET_CART_BOOKS = gql`
  query GetCartBooks($membership_num: String!) {
    CartItems(membership_num: $membership_num) {
      book_id
    }
  }
`;

const ADD_TO_CART = gql` 
  mutation AddToCart($cart_item: userCartInfo!) {
    addToCart(cart_item: $cart_item) {
      _id
      book_id
      membership_num
    }
  }
`;

const BookDetail = () => {
  const { id } = useParams();
  const bookId = parseInt(id);
  const navigate = useNavigate();
  
  const isValid = useSelector((state) => state.auth.isValid);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const membershipNum = JSON.parse(localStorage.getItem("userInfo")).membership_num

  const { loading, error, data } = useQuery(GET_BOOK_DETAIL, { 
    variables: { book_id: bookId },
  });

  const { data: cartData } = useQuery(GET_CART_BOOKS, { 
    variables: { membership_num: membershipNum },
  });

  const [book, setBook] = useState(null);
  const [addToCart] = useMutation(ADD_TO_CART);

  useEffect(() => {
    if (data) {
      if (data.getBook) {
        setBook(data.getBook);
      }
    }
  }, [data]);

  const handleAddToCart = async () => {
    if(isValid && !isAdmin && isWebTokenValid) {

      if (cartData && cartData.CartItems.some(item => item.book_id === bookId)) {
        toast.error("Book is already in the cart");
        return;
      }
      const cartItem = {
        book_id: bookId,
        membership_num: membershipNum
      }
      

      try {
        const { data } = await addToCart({ variables: {cart_item: cartItem}});
        if (data.addToCart) {
          toast.success("Book added to cart successfully");
          navigate("/cart");
        } else {
          toast.error("Error adding book to cart");
        }
      } catch (error) {
        console.error("Error in addToCart mutation:", error);
        toast.error("Error adding book to cart");
      }
    }
    else 
      toast.error("Please login with you account to add book to cart");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading book details</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <>
      <Toaster/>
      <div className="book-detail">
        <div className="book-image-container">
          <img
            src={book.book_image_url}
            alt={book.book_name}
            className="book-detail-image"
          />
        </div>
        <div className="book-info">
          <h1>{book.book_name}</h1>
          <p><strong>Author:</strong> {book.book_author}</p>
          <p><strong>Genre:</strong> {book.book_genre}</p>
          <p className="book-short-description"><strong>Short Description:</strong> {book.book_shortDescription}</p>
          <p className="book-long-description"><strong>Long Description:</strong> {book.book_longDescription}</p>
          <button className="add-to-cart" onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
