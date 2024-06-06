import React from "react";

import "../index.css";

function BookItem({ image, title, price,Author }) {
  return (
    <div className="product-item">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{price}</p>
      <p>{Author}</p>
    </div>
  );
}

export default BookItem;
