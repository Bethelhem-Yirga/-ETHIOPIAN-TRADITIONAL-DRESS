// pages/Products.js
import React, { useState } from 'react';
import './Products.css';

const allProducts = [
  {
    id: 1,
    name: "Habesha Kemis - Gold Edition",
    amharicName: "ሐበሻ ቀሚስ - ወርቅ",
    price: "3500 ETB",
    category: "women",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3",
    description: "Luxurious handwoven dress with golden embroidery"
  },
  {
    id: 2,
    name: "Men's Traditional Suit",
    amharicName: "የወንዶች ባህላዊ ልብስ",
    price: "3000 ETB",
    category: "men",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3",
    description: "Elegant traditional suit with shawl"
  },
  {
    id: 3,
    name: "Netela Scarf",
    amharicName: "ነጠላ",
    price: "800 ETB",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-4.0.3",
    description: "Traditional white scarf with colored borders"
  },
  {
    id: 4,
    name: "Habesha Kemis - Silver Edition",
    amharicName: "ሐበሻ ቀሚስ - ብር",
    price: "2800 ETB",
    category: "women",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3",
    description: "Elegant dress with silver embroidery"
  },
  {
    id: 5,
    name: "Kuta Traditional Jacket",
    amharicName: "ኩታ",
    price: "1800 ETB",
    category: "men",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3",
    description: "Traditional men's jacket"
  },
  {
    id: 6,
    name: "Tilfi Shawl",
    amharicName: "ጥልፍ መጠቅለያ",
    price: "1200 ETB",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-4.0.3",
    description: "Hand-embroidered shawl"
  }
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.amharicName.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">Our Collection</h1>
        <p className="page-subtitle">የእኛ ምርቶች</p>
        
        <div className="filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="category-filters">
            <button
              className={selectedCategory === 'all' ? 'active' : ''}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            <button
              className={selectedCategory === 'women' ? 'active' : ''}
              onClick={() => setSelectedCategory('women')}
            >
              Women's
            </button>
            <button
              className={selectedCategory === 'men' ? 'active' : ''}
              onClick={() => setSelectedCategory('men')}
            >
              Men's
            </button>
            <button
              className={selectedCategory === 'accessories' ? 'active' : ''}
              onClick={() => setSelectedCategory('accessories')}
            >
              Accessories
            </button>
          </div>
        </div>
        
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="amharic-name">{product.amharicName}</p>
                <p className="product-description">{product.description}</p>
                <p className="product-price">{product.price}</p>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;