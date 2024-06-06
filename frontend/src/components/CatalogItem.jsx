import React from 'react';
import '../index.css';

function CatalogItem({ title, author, price, sources }) {
  return (
    <div className="product-item">
      <picture>
        {sources.map((source, index) => (
          <source key={index} srcSet={source.src} media={source.media} />
        ))}
        <img src={sources[0].src} alt={title} />
      </picture>

      <h2>{title}</h2>
      {author && <p>{author}</p>}
      {price && <p>{price}</p>}
    </div>
  );
}

export default CatalogItem;
