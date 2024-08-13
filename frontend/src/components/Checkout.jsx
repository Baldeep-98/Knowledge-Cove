import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation, useApolloClient } from "@apollo/client";
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

const CHECKOUT = gql`
  mutation Checkout($order: OrderInput!) {
    checkout(order: $order)
  }
`;

const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: String!) {
    getUserProfile(user_id: $userId) {
      user_id
      name
      email
      address
    }
  }
`;

const CheckoutPage = () => {
  const { data, loading, error } = useQuery(GET_CART_BOOKS);
  const { data: userProfileData, loading: userProfileLoading, error: userProfileError } = useQuery(GET_USER_PROFILE, {
    variables: {
      userId: JSON.parse(localStorage.getItem("userInfo"))?.user_id
    }
  });
  const [checkout] = useMutation(CHECKOUT);
  const client = useApolloClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    billingName: "",
    billingEmail: "",
    billingAddress: "",
    shippingName: "",
    shippingEmail: "",
    shippingAddress: "",
    selection: "",
    location: ""
  });

  const isValid = useSelector((state) => state.auth.isValid);

  useEffect(() => {
    if (userProfileData) {
      setFormData((prevData) => ({
        ...prevData,
        billingName: userProfileData.getUserProfile.name,
        billingEmail: userProfileData.getUserProfile.email,
        billingAddress: userProfileData.getUserProfile.address
      }));
    }
  }, [userProfileData]);

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

  const handleCheckout = async (order) => {
    try {
      const response = await client.mutate({
        mutation: CHECKOUT,
        variables: { order }
      });
      if (response.data.checkout) {
        console.log('Checkout successful');
        toast.success("Checkout successful");
        navigate("/confirmation", { state: { formData, cartItems: CartItems } });
      } else {
        console.log('Checkout failed');
        toast.error("Checkout failed");
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error("Error during checkout");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      billingName: formData.billingName,
      billingEmail: formData.billingEmail,
      billingAddress: formData.billingAddress,
      shippingName: formData.shippingName,
      shippingEmail: formData.shippingEmail,
      shippingAddress: formData.shippingAddress,
      items: CartItems.map(item => ({
        book_id: item.book_id,
        book_name: item.bookDetails.book_name,
        book_author: item.bookDetails.book_author,
        book_genre: item.bookDetails.book_genre
      }))
    };
    await handleCheckout(order);
  };

  if (!isValid && !isWebTokenValid()) {
    navigate("/login");
    return null; // Prevent rendering the component if the user is not logged in
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
                required />
            </label>

            <h2>Shipping Information</h2>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  id="location"
                  name="selection"
                  value="location"
                  checked={formData.selection === 'location'}
                  onChange={handleChange}
                  required
                />
                Select Location
              </label>
              <label>
                <input
                  type="radio"
                  id="shippingAddress"
                  name="selection"
                  value="shippingAddress"
                  checked={formData.selection === 'shippingAddress'}
                  onChange={handleChange}
                  required
                />
                Shipping Address
              </label>
            </div>

            {formData.selection === 'location' && (
              <label>
                Location:
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                >
                  <option value="kitchener">Kitchener</option>
                  <option value="Waterloo">Waterloo</option>
                  <option value="Cambridge">Cambridge</option>
                  <option value="Mississauga">Mississauga</option>
                </select>
              </label>
            )}

            {formData.selection === 'shippingAddress' && (
              <div>
                <label>
                  Shipping Name:
                  <input
                    type="text"
                    name="shippingName"
                    value={formData.shippingName}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Shipping Email:
                  <input
                    type="email"
                    name="shippingEmail"
                    value={formData.shippingEmail}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Shipping Address:
                  <input
                    type="text"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            )}

            <button type="submit">Place Order</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
