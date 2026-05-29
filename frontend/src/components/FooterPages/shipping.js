import React from 'react';
import './Shipping.css';

const Shipping = () => {
  return (
    <div className="shipping-container">
      <header className="shipping-header">
        <h1>Shipping & Delivery</h1>
        <p className="subtitle">Get your order fast with our reliable shipping options</p>
      </header>
      
      <section className="shipping-section">
        <h2 className="section-title">Domestic Shipping (U.S.)</h2>
        <div className="shipping-grid">
          <div className="shipping-option">
            <h3>Standard Shipping</h3>
            <p>3-5 business days</p>
            <p className="price">$5.99</p>
          </div>
          <div className="shipping-option highlighted">
            <h3>Express Shipping</h3>
            <p>2-3 business days</p>
            <p className="price">$12.99</p>
          </div>
          <div className="shipping-option">
            <h3>Overnight Shipping</h3>
            <p>Next business day</p>
            <p className="price">$24.99</p>
          </div>
        </div>
      </section>

      <section className="shipping-section">
        <h2 className="section-title">International Shipping</h2>
        <p className="shipping-note">Available to most countries. Delivery times vary by destination.</p>
        <div className="shipping-grid">
          <div className="shipping-option">
            <h3>International Standard</h3>
            <p>7-14 business days</p>
            <p className="price">$14.99</p>
          </div>
          <div className="shipping-option">
            <h3>International Express</h3>
            <p>3-7 business days</p>
            <p className="price">$29.99</p>
          </div>
        </div>
      </section>

      <section className="shipping-notice">
        <h2 className="section-title">Important Notes</h2>
        <ul className="notice-list">
          <li>Processing time: 1-2 business days before shipment</li>
          <li>Free shipping on orders over $50</li>
          <li>Tracking information provided for all orders</li>
        </ul>
      </section>
    </div>
  );
};

export default Shipping;