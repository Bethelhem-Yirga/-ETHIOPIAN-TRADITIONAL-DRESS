// pages/Home.js
import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import AboutPreview from '../components/AboutPreview';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <FeaturedProducts />
      <AboutPreview />
    </div>
  );
};

export default Home;