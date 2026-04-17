import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <div className="card__shine"></div>
      <div className="card__glow"></div>
      <div className="card__content">
        {product.isNew && <div className="card__badge">NEW</div>}
        <div className="card__image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="card__text">
          <p className="card__title">{product.name}</p>
          <p className="card__description">{product.amharicName}</p>
        </div>
        <div className="card__footer">
          <div className="card__price">ETB {product.price.toLocaleString()}</div>
          <div className="card__button">
            <svg height="16" width="16" viewBox="0 0 24 24">
              <path
                strokeWidth="2"
                stroke="currentColor"
                d="M4 12H20M12 4V20"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;