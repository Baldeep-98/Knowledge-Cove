import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

const GET_CART_Books = gql`
  query GetCartBooks {
    CartItems {
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
        book_longDescription
        book_image_url
      }
    }
  }`; // query to get cart items with details
const Cart = () => {
  const { data } = useQuery(GET_CART_Books); //useQuery hook to run Get_cart_books query

  const [CartItems, setCartItems] = useState([]); // state to hold the items of cart
 const navigate=useNavigate();
  useEffect(() => {    //to update the state of cart items

    if (data) {
      setCartItems(data.CartItems);
    }
  }, [data]);
  const handleClick=(book_id)=>{
    navigate(`/checkout/${book_id}`);
    console.log("button clicked");
  }
  return (
    <div className="cart" onClick={handleClick}>
      <h1 className="cartHead">Shopping Cart</h1>
      {CartItems.map((item) => (
        <div key={item._id} className="cart-info">
          <div className="cart-image-container">
            <img
              className="cart-detail-image"
              src={item.bookDetails.book_image_url}
              alt={item.bookDetails.book_name}
            />
          </div>
          <div className="book-info">
            <h2>{item.bookDetails.book_name}</h2>
            <p className="cartdesc">Book Author:{item.bookDetails.book_author}</p>
            <p className="cartdesc">Book Genre:{item.bookDetails.book_genre}</p>
            <Link to={`/checkOut/${item.bookDetails.book_id}`}></Link>
           <button className="btncheckout">Check Out</button>
           </div>
        </div>
      ))}
    </div>
  );
};
export default Cart;