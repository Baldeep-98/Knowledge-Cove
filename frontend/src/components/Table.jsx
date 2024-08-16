import React from "react";
import InvoiceTableRow from "./InvoiceTableRow";

const Table = ({ cartItems }) => {
  const today = new Date();
  const dueDate = new Date(today);
  dueDate.setDate(today.getDate() + 14);



  const rowStyle = {
    border: "1px solid #000",
    padding: "8px",
    textAlign: "left",
  };

  return (
    <div className="cart-table-container">
      <table className="cart-table">
        <thead>
          <tr style={rowStyle}>
            <th style={rowStyle}>Book ID</th>
            <th style={rowStyle}>Book Name</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="2" style={rowStyle}>No items in the cart</td>
            </tr>
          ) : (
            cartItems.map((item) => (
              <InvoiceTableRow key={item._id} item={item} rowStyle={rowStyle} />
            ))
          )}
        </tbody>
      </table>

    
    </div>
  );
};

export default Table;
