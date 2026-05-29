import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <header className="privacy-header">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: January 1, 2025</p>
      </header>

      <section className="privacy-intro">
        <p className="intro-text">
          Addison ("we," "our," or "us") is committed to protecting your privacy. 
          This policy explains how we collect, use, and safeguard your information.
        </p>
      </section>

      <div className="policy-content">
        <section className="policy-section">
          <h2 className="section-title">1. Information We Collect</h2>
          <div className="section-content">
            <p>We may collect the following types of information:</p>
            <ul className="policy-list">
              <li>Personal identification information (Name, email, phone number)</li>
              <li>Demographic information (age, gender, location)</li>
              <li>Technical data (IP address, browser type, device information)</li>
              <li>Usage data (pages visited, time spent on site)</li>
            </ul>
          </div>
        </section>

        <section className="policy-section">
          <h2 className="section-title">2. How We Use Your Information</h2>
          <div className="section-content">
            <p>Your information helps us to:</p>
            <ul className="policy-list">
              <li>Provide and maintain our services</li>
              <li>Improve user experience</li>
              <li>Communicate with you</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </section>

        <section className="policy-section">
          <h2 className="section-title">3. Data Protection</h2>
          <div className="section-content">
            <p>We implement appropriate security measures including:</p>
            <ul className="policy-list">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls to personal information</li>
              <li>Secure data storage solutions</li>
            </ul>
          </div>
        </section>

        <section className="policy-section">
          <h2 className="section-title">4. Your Rights</h2>
          <div className="section-content">
            <p>You have the right to:</p>
            <ul className="policy-list">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
            </ul>
          </div>
        </section>

        <section className="contact-section">
          <h2 className="section-title">Contact Us</h2>
          <p className="contact-text">
            If you have questions about this privacy policy, please contact us at:
            <br />
            <a href="mailto:privacy@addison.com">privacy@addison.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;