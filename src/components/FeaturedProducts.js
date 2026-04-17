import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedProducts.css';

const products = [
  { id: 1, name: "Habesha Kemis", price: "3,500 ETB", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3" },
  { id: 2, name: "Men's Traditional Suit", price: "3,000 ETB", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3" },
  { id: 3, name: "Netela Scarf", price: "800 ETB", image: "https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-4.0.3" },
  { id: 4, name: "Premium Shawl", price: "1,200 ETB", image: "https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-4.0.3" }
];

const FeaturedProducts = () => {
  return (
    <section className="featured-products">
      <div className="container">
        <h2 className="section-title">New Arrivals</h2>
        <p className="section-subtitle">Discover our latest collection</p>
        
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <button className="btn-cart">Add to Cart</button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-all">
          <Link to="/products" className="btn-secondary">View All Products</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;