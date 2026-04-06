import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../contexts/LanguageContext';
import './Products.css';

const allProducts = [
  {
    id: 1,
    name: "Habesha Kemis",
    amharicName: "ሐበሻ ቀሚስ",
    price: 3500,
    category: "ሐበሻ ቀሚስ",
    image: "img/hbdr.jpg",
    isNew: true
  },
  {
    id: 2,
    name: "Habesha Man Traditional Cloth",
    amharicName: "የወንዶች ልብስ",
    price: 3000,
    category: "የወንዶች ልብስ",
    image: "img/mens.jpg",
    isNew: false
  },
  {
    id: 3,
    name: "Netela Scarf",
    amharicName: "ነጠላ",
    price: 800,
    category: "ነጠላ",
    image: "img/scarf.jpg",
    isNew: true
  },
  {
    id: 4,
    name: "Habesha Man Traditional Cloth",
    amharicName: "የወንዶች ልብስ",
    price: 1800,
    category: "የወንዶች ልብስ",
    image: "img/m4.jpg",
    isNew: false
  },
  {
    id: 5,
    name: "Tilfi",
    amharicName: "ጥልፍ",
    price: 1200,
    category: "ነጠላ",
    image: "img/telf.jpg",
    isNew: false
  },
  {
    id: 6,
    name: "Wedding Dress",
    amharicName: "የሰርግ ቀሚስ",
    price: 5500,
    category: "ሐበሻ ቀሚስ",
    image: "img/wd.jpg",
    isNew: true
  }
];

const Products = () => {
  const { t } = useLanguage();  // Removed unused 'isAmharic'
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
        <div className="products-header">
          <h1 className="page-title">{t('OurCollections')}</h1>
        </div>

        <div className="filters-bar">
          <input 
            type="text" 
            placeholder={t('searchProducts') || "Search products..."} 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="category-buttons">
            <button className={selectedCategory === 'all' ? 'active' : ''} onClick={() => setSelectedCategory('all')}>{t('all')}</button>
            <button className={selectedCategory === 'ሐበሻ ቀሚስ' ? 'active' : ''} onClick={() => setSelectedCategory('ሐበሻ ቀሚስ')}>{t('habeshaKemis')}</button>
            <button className={selectedCategory === 'የወንዶች ልብስ' ? 'active' : ''} onClick={() => setSelectedCategory('የወንዶች ልብስ')}>{t('habeshaManCloth')}</button>
            <button className={selectedCategory === 'ነጠላ' ? 'active' : ''} onClick={() => setSelectedCategory('ነጠላ')}>{t('netelaScarf')}</button>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;