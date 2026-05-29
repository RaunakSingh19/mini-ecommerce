import React, { useState } from 'react';
import './FAQ.css';
import { FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are securely processed through our payment gateway with 256-bit encryption for your protection."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the US. We also offer expedited shipping options (2-day and overnight) during checkout. International shipping times vary by destination and typically take 7-14 business days."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times will be calculated at checkout. Please note that international orders may be subject to customs fees and import duties, which are the responsibility of the customer."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused items with original tags and packaging. Return shipping is free for US customers. International returns are subject to shipping fees. Please contact our customer service team to initiate a return."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can track your package directly through our website or the carrier's tracking system. If you need assistance, our customer service team is happy to help."
    },
    {
      question: "Are your products sustainably made?",
      answer: "Absolutely. We prioritize sustainable materials and ethical manufacturing practices. Over 60% of our products incorporate recycled materials, and we're continuously working to improve our sustainability efforts. Each product page details its sustainable features."
    },
    {
      question: "Do you offer product warranties?",
      answer: "All our products come with a 1-year warranty against manufacturing defects. For sustainability reasons, we also offer repair services to extend the life of your bag whenever possible. Contact us for warranty claims or repair inquiries."
    },
    {
      question: "How do I care for my Addison bag?",
      answer: "Care instructions vary by material. Each product comes with specific care instructions, and we also have comprehensive care guides available on our website under the 'Materials' section. Generally, we recommend using a soft, damp cloth for cleaning and avoiding harsh chemicals."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {/* Header Section */}
      <header className="faq-header">
        <div className="header-content">
          <FiHelpCircle className="header-icon" />
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our products and services</p>
        </div>
      </header>

      {/* Search Functionality */}
      <div className="search-section">
        <input 
          type="text" 
          placeholder="Search FAQs..." 
          className="search-input"
        />
        <button className="search-btn">Search</button>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        <button className="filter-btn active">All Questions</button>
        <button className="filter-btn">Shipping</button>
        <button className="filter-btn">Returns</button>
        <button className="filter-btn">Payments</button>
        <button className="filter-btn">Products</button>
      </div>

      {/* FAQ List */}
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`} 
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{item.question}</h3>
              {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Prompt */}
      <div className="contact-prompt">
        <h3>Still have questions?</h3>
        <p>Our customer service team is happy to help with any additional questions you may have.</p>
        <div className="contact-options">
          <a href="/contact" className="contact-link">Contact Us</a>
          <a href="mailto:support@addisonbags.com" className="contact-link">Email Support</a>
          <a href="tel:+15551234567" className="contact-link">Call Us</a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;