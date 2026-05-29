import React from 'react';
import './Returns.css';

const Returns = () => {
  return (
    <div className="returns-container">
      <header className="returns-header">
        <h1>Returns & Exchanges</h1>
        <p className="returns-subtitle">Hassle-free returns within 30 days</p>
      </header>

      <div className="returns-content">
        <section className="returns-section">
          <div className="policy-highlight">
            <div className="highlight-box">
              <h3>30-Day Return Window</h3>
              <p>Return any unused item within 30 days of delivery</p>
            </div>
            <div className="highlight-box">
              <h3>Free Returns</h3>
              <p>Free return shipping for US customers</p>
            </div>
            <div className="highlight-box">
              <h3>Easy Process</h3>
              <p>Start your return online in just a few clicks</p>
            </div>
          </div>
        </section>

        <section className="returns-section">
          <h2 className="section-title">Our Return Policy</h2>
          <p className="section-intro">
            We want you to love your new bag as much as we do. If you're not completely satisfied,
            we offer easy returns and exchanges within 30 days of delivery.
          </p>

          <div className="requirements">
            <h3>Return Requirements:</h3>
            <ul className="requirements-list">
              <li>Item must be unused and in original condition</li>
              <li>Original tags and packaging must be attached</li>
              <li>Proof of purchase required</li>
              <li>Personalized items cannot be returned</li>
              <li>Final sale items marked "non-returnable" excluded</li>
            </ul>
          </div>
        </section>

        <section className="returns-section">
          <h2 className="section-title">How to Return</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Initiate Your Return</h3>
                <p>Visit our Returns Center and enter your order details</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Pack Your Item</h3>
                <p>Include all original packaging and tags</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Ship It Back</h3>
                <p>Use the prepaid label or ship to our returns center</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Receive Your Refund</h3>
                <p>Refund processed within 3-5 business days after inspection</p>
              </div>
            </div>
          </div>
        </section>

        <section className="returns-section">
          <h2 className="section-title">Refund Information</h2>
          <div className="refund-details">
            <p>Refunds will be issued to the original payment method.</p>
            <ul className="refund-list">
              <li>Standard shipping fees are non-refundable</li>
              <li>Exchanges are free for size/color changes</li>
              <li>International returns may be subject to customs fees</li>
              <li>Please allow 7-10 days for refund to appear in your account</li>
            </ul>
          </div>
        </section>

        <section className="contact-section">
          <h2 className="section-title">Need Help?</h2>
          <p className="contact-text">
            Contact our customer care team at <a href="mailto:returns@example.com">returns@example.com</a>
            <br />
            or call us at <a href="tel:+18005551234">(800) 555-1234</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Returns;