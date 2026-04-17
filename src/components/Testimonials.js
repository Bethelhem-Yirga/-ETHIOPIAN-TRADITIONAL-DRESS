import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: "Anna Trevor",
    title: "Customer",
    text: "Amazing quality! The Habesha dress I ordered exceeded my expectations. The craftsmanship is outstanding and delivery was fast.",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    name: "Michael Kebede",
    title: "Customer",
    text: "Best traditional clothing store in Addis! The men's suit fits perfectly and the material is premium quality.",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 3,
    name: "Sara Mesfin",
    title: "Customer",
    text: "I love my new Netela scarf! Beautiful design and excellent customer service. Will definitely shop again.",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">Customer's Testimonial</h2>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-img">
                <img src={testimonial.image} alt={testimonial.name} />
              </div>
              <h4>{testimonial.name}</h4>
              <span className="testimonial-title">{testimonial.title}</span>
              <p>"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;