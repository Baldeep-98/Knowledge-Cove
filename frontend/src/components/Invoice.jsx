import React from "react";
import { useLocation } from "react-router-dom";
import Table from "./Table";

const Invoice = () => {
  const { state } = useLocation();
  const formData = state?.formData || {};
  const cartItems = state?.cartItems || [];

  console.log('Form Data:', formData);
  console.log('Cart Items:', cartItems);



  return (
    <div className="invoice-page">
      <div className="invoice-header">
        <h1>Invoice</h1>
        <div className="invoice-dates">
          <p><strong>Today's Date:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>Due Date:</strong> {new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="invoice-info">
        <div className="billing-info">
          <h2>Billing Information</h2>
          <p><strong>Name:</strong> {formData.billingName || 'N/A'}</p>
          <p><strong>Email:</strong> {formData.billingEmail || 'N/A'}</p>
          <p><strong>Address:</strong> {formData.billingAddress || 'N/A'}</p>
        </div>

        <div className="shipping-info">
          <h2>Shipping Information</h2>
          {formData.selection === 'location' ? (
            <p><strong>Location:</strong> {formData.location || 'N/A'}</p>
          ) : (
            <>
              <p><strong>Name:</strong> {formData.shippingName || 'N/A'}</p>
              <p><strong>Email:</strong> {formData.shippingEmail || 'N/A'}</p>
              <p><strong>Address:</strong> {formData.shippingAddress || 'N/A'}</p>
            </>
          )}
        </div>
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        {cartItems.length > 0 ? (
          <Table cartItems={cartItems} />
        ) : (
          <p>No items in the cart</p>
        )}
      </div>

     
    </div>
  );
};

export default Invoice;
