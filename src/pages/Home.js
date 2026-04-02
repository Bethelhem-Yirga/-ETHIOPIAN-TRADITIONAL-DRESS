import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import FeaturedProducts from '../components/FeaturedProducts';
import Newsletter from '../components/Newsletter';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <FeaturedProducts />
      <Newsletter />
      <Testimonials />
    </div>
  );
};

export default Home;