import React from "react";

const InvoiceTableRow = ({ item,rowStyle }) => {
  return (
    <tr>
      <td style={rowStyle}>{item.book_id}</td>
      <td style={rowStyle}>{item.bookDetails.book_name}</td>
    </tr>
  );
};

export default InvoiceTableRow;
