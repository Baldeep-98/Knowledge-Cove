import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import emptyCartImage from "../assets/Images/emptyCartImage.gif";
import { useSelector } from 'react-redux';
import { isWebTokenValid } from '../webTokenVerification';

const GET_CART_BOOKS = gql`
  query GetCartBooks {
    CartItems {
      _id
      book_id
      bookDetails {
        _id
        book_name
        book_author
        book_genre
        book_shortDescription
        book_image_url
      }
    }
  }
`;

const ADD_BOOK_TO_CART = gql`
  mutation AddBookToCart($book_id: ID!) {
    addBookToCart(book_id: $book_id) {
      _id
      book_id
      bookDetails {
        _id
        book_name
        book_author
        book_genre
        book_shortDescription
        book_image_url
      }
    }
  }
`;

const REMOVE_BOOK = gql`
  mutation RemoveBook($book_id: ID!) {
    bookDelete(book_id: $book_id)
  }
`;

const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart
  }
`;

const Cart = () => {
  const { data, refetch } = useQuery(GET_CART_BOOKS);
  const [CartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [removeBook] = useMutation(REMOVE_BOOK);
  const [clearCart] = useMutation(CLEAR_CART);
  const [addBookToCart] = useMutation(ADD_BOOK_TO_CART);

  const isValid = useSelector((state) => state.auth.isValid);

  useEffect(() => {
    if (data) {
      setCartItems(data.CartItems);
    }
  }, [data]);

  const handleAddBookToCart = async (book_id) => {
    if (CartItems.some(item => item.book_id === book_id)) {
      toast.error("Book is already in the cart");
      return;
    }

    try {
      const { data } = await addBookToCart({
        variables: { book_id: String(book_id) },
      });

      if (data.addBookToCart) {
        setCartItems(prevItems => [...prevItems, data.addBookToCart]);
        toast.success("Book added to cart successfully");
        await refetch();
      } else {
        toast.error("Error adding book to the cart");
      }
    } catch (error) {
      console.error("Error in addBookToCart mutation:", error);
      toast.error("Error adding book to the cart");
    }
  };

  const handleRemoveButton = async (book_id) => {
    try {
      const { data } = await removeBook({
        variables: { book_id: String(book_id) },
      });
      if (data.bookDelete) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.book_id !== book_id)
        );
        toast.success("Book removed successfully");
        await refetch();
      } else {
        toast.error("Error removing the book");
      }
    } catch (error) {
      console.error("Error in removeBook mutation:", error);
      toast.error("Error removing the book");
    }
  };

  const handleClearCart = async () => {
    try {
      const { data } = await clearCart();
      if (data.clearCart) {
        setCartItems([]);
        toast.success("Cart cleared successfully");
        await refetch();
      } else {
        toast.error("Failed to clear the cart");
      }
    } catch (error) {
      console.error("Error in clearCart mutation:", error);
      toast.error("Error clearing the cart");
    }
  };

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  if (!isValid && !isWebTokenValid()) {
    navigate("/login");
  }

  return (
    <div className="cart">
      <h1 className="cartHead">Shopping Cart</h1>
      {CartItems.length === 0 ? (
        <div className="empty-cart">
          <img src={emptyCartImage} alt="Empty cart" />
        </div>
      ) : (
        <div className="cart-gallery">
          {CartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-image-container">
                <img
                  className="cart-detail-image"
                  src={item.bookDetails.book_image_url}
                  alt={item.bookDetails.book_name}
                />
              </div>
              <div className="cart-info">
                <h2>{item.bookDetails.book_name}</h2>
                <p className="cartdesc">
                  Book Author: {item.bookDetails.book_author}
                </p>
                <p className="cartdesc">
                  Book Genre: {item.bookDetails.book_genre}
                </p>
                <Link to={`/checkout/${item.bookDetails.book_id}`}></Link>
                <button
                  className="removecheckout"
                  onClick={() => handleRemoveButton(item.book_id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {CartItems.length > 0 && (
        <div className="cart-actions">
          <button className="btnEmptyCart" onClick={handleClearCart}>
            Empty Cart
          </button>
          <button className="btncheckout" onClick={handleCheckoutClick}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
