import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
        book_longDescription
        book_image_url
      }
    }
  }
`;

const CheckoutPage = () => {
  const { data, loading, error } = useQuery(GET_CART_BOOKS);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    billingName: "",
    billingEmail: "",
    billingAddress: "",
    shippingName: "",
    shippingEmail: "",
    shippingAddress: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    firstName: "",
    LastName: "",
  });

  const isValid = useSelector((state) => state.auth.isValid);

  if (loading) return <p>Loading...</p>;
  if (error) {
    toast.error(`Failed to fetch cart books: ${error.message}`);
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  const CartItems = data?.CartItems || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for credit card number
    if (formData.cardNumber.length !== 12) {
      toast.error("Credit card number must be 12 digits long");
      return;
    }

    // Validation for CVV length
    if (formData.cardCVC.length !== 3) {
      toast.error("CVV must be 3 digits long");
      return;
    }

    console.log("Form data submitted:", formData);
    toast.success("Order Placed successfully");
    setTimeout(() => {
      navigate("/catalogue");
    }, 2000);
  };

  if (!isValid && !isWebTokenValid()) {
    navigate("/login");
  }



  return (
    <>
      <Toaster />
      <div className="checkout-page">
        <div className="product-details-section">
          <h2>Order Summary</h2>
          {CartItems.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            CartItems.map((item) => (
              <div key={item._id} className="product-detail">
                <img
                  src={item.bookDetails.book_image_url}
                  alt={item.bookDetails.book_name}
                />
                <div>
                  <h3>{item.bookDetails.book_name}</h3>
                  <p>{item.bookDetails.book_author}</p>
                  <p>{item.bookDetails.book_genre}</p>
                  <p>{item.bookDetails.book_shortDescription}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="checkout-form-section">
          <h2>Checkout Form</h2>
          <form onSubmit={handleSubmit}>
            <h2>Billing Information</h2>
            <label>
              Name:
              <input
                type="text"
                name="billingName"
                value={formData.billingName}
                onChange={handleChange}
                required />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="billingEmail"
                value={formData.billingEmail}
                onChange={handleChange}
                required />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleChange}
                required   />
            </label>

            <h2>Shipping Information</h2>
            <label>
              Name:
              <input
                type="text"
                name="shippingName"
                value={formData.shippingName}
                onChange={handleChange}
                required  />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="shippingEmail"
                value={formData.shippingEmail}
                onChange={handleChange}
                required/>
            </label>
            <label>
              Address:
              <input
                type="text"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                required/>
            </label>

            <h2>Payment Information</h2>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required/>
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                required />
            </label>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                pattern="\d{12}"
                title="Credit card number must be 12 digits long" />
            </label>
            <label>
              Expiry Date:
              <input
                type="month"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleChange}
                required />
            </label>
            <label>
              CVC:
              <input
                type="text"
                name="cardCVV"
                value={formData.cardCVC}
                onChange={handleChange}
                required
                pattern="\d{3}"
                title="CVV must be 3 digits long"/>
            </label>

            <button type="submit">Place Order</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
