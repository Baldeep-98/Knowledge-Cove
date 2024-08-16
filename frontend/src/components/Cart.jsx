import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import emptyCartImage from "../assets/Images/emptyCartImage.gif";
import { useSelector } from 'react-redux';
import { isWebTokenValid } from '../webTokenVerification';

const GET_CART_BOOKS = gql`
  query GetCartBooks ($membership_num: String!) {
    CartItems(membership_num: $membership_num) {
      _id
      book_id
      membership_num
      bookDetails {
        _id
        book_id
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
  mutation RemoveBook($cart_item: userCartInfo!) {
    cartBookDelete(cart_item: $cart_item)
  }
`;

const CLEAR_CART = gql`
  mutation ClearCart($membership_num: String!) {
    clearCart(membership_num: $membership_num)
  }
`;

const Cart = () => {
  const navigate = useNavigate();
  const [CartItems, setCartItems] = useState([]);
  const isValid = useSelector((state) => state.auth.isValid);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const membershipNum = JSON.parse(localStorage.getItem("userInfo")).membership_num

  const { data, refetch, loading } = useQuery(GET_CART_BOOKS, {
    variables: { membership_num: membershipNum },
    onCompleted: (data) => {
      setCartItems(data.CartItems);
    },
    onError: (error) => {
      console.log("Cart info fetch failed!", error);
    }
  });

  const [removeBook] = useMutation(REMOVE_BOOK, {
    onCompleted: async () => {
      toast.success("Book removed successfully");
      await refetch();
    },
    onError: (error) => {
      console.error("Error in removeBook mutation:", error);
      toast.error("Error removing the book");
    }
  });

  const [clearCart] = useMutation(CLEAR_CART, {
    onCompleted: async () => {
      toast.success("Cart cleared successfully");
      await refetch();
    },
    onError: (error) => {
      console.error("Error in clearCart mutation:", error);
      toast.error("Error clearing the cart");
    }
  });

  useEffect(() => {
    refetch();
    if (data) {
      setCartItems(data.CartItems);
    }
  }, [data,refetch]);

  const handleRemoveButton = async (bookId) => {

    const removeItem = {
      book_id: bookId,
      membership_num: membershipNum
    }

    await removeBook( { variables: {cart_item: removeItem}});
  };

  const handleClearCart = async () => {
    await clearCart({variables: { membership_num: membershipNum }});
  };

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  // Redirect conditions
  if (!isValid && !isWebTokenValid()) {
    navigate("/login");
  }

  if (isValid && isAdmin) {
    navigate("/home");
  }

  if (loading) {
    return <div>Loading...</div>; // Add a loading state
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
                  src={item.bookDetails ? item.bookDetails.book_image_url : ""}
                  alt={item.bookDetails ? item.bookDetails.book_name : ""}
                />
              </div>
              <div className="cart-info">
                <h2>{item.bookDetails ? item.bookDetails.book_name : ""}</h2>
                <p className="cartdesc">
                  Book Author: {item.bookDetails ? item.bookDetails.book_author : ""}
                </p>
                <p className="cartdesc">
                  Book Genre: {item.bookDetails ? item.bookDetails.book_genre : ""}
                </p>
                <Link to={`/checkout/${item.bookDetails ? item.bookDetails.book_id : ""}`}></Link>
                <button
                  className="removecheckout"
                  onClick={() => handleRemoveButton(item.bookDetails ? item.bookDetails.book_id : "")}
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
