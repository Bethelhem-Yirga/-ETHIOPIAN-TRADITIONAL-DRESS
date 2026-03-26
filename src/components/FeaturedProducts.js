// components/FeaturedProducts.js
import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedProducts.css';

const products = [
  {
    id: 1,
    name: "Traditional Habesha Kemis",
    amharicName: "ሐበሻ ቀሚስ",
    price: "2500 ETB",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3",
    description: "Handwoven traditional dress with intricate embroidery"
  },
  {
    id: 2,
    name: "Men's Traditional Suit",
    amharicName: "የወንዶች ባህላዊ ልብስ",
    price: "3000 ETB",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3",
    description: "Elegant traditional suit with shawl"
  },
  {
    id: 3,
    name: "Scarf & Netela",
    amharicName: "ነጠላ እና መጠቅለያ",
    price: "800 ETB",
    image: "https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-4.0.3",
    description: "Beautiful handwoven scarf for any occasion"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="featured-products">
      <div className="container">
        <h2 className="section-title">Featured Collections</h2>
        <p className="section-subtitle">የተመረጡ ስብስቦች</p>
        
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <Link to={`/products/${product.id}`} className="view-details">
                    View Details
                  </Link>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="amharic-name">{product.amharicName}</p>
                <p className="product-description">{product.description}</p>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-all">
          <Link to="/products" className="btn-outline">View All Products →</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;