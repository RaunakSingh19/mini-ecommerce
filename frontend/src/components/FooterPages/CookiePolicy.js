import React from 'react';
import './CookiePolicy.css';

const CookiePolicy = () => {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      purpose: "Necessary for the website to function properly",
      examples: ["Session management", "Authentication", "Security"],
    },
    {
      name: "Performance Cookies",
      purpose: "Help us understand how visitors interact with our site",
      examples: ["Analytics", "Error tracking", "Performance monitoring"],
    },
    {
      name: "Functional Cookies",
      purpose: "Remember your preferences and settings",
      examples: ["Language selection", "Region settings", "Layout preferences"],
    },
    {
      name: "Marketing Cookies",
      purpose: "Used to deliver relevant advertising",
      examples: ["Ad targeting", "Campaign measurement", "Retargeting"],
    }
  ];

  return (
    <div className="cookie-policy-container">
      <header className="cookie-header">
        <h1>Cookie Policy</h1>
        <p className="last-updated">Last Updated: January 1, 2025</p>
      </header>

      <section className="policy-intro">
        <p>This Cookie Policy explains how Addison ("we," "us," or "our") uses cookies and similar tracking technologies on our website addisonBags.com (the "Site"). By using our Site, you consent to our use of cookies as described in this policy.</p>
      </section>

      <section className="what-are-cookies">
        <h2>What Are Cookies?</h2>
        <div className="info-card">
          <p>Cookies are small text files that are placed on your device when you visit websites. They help the website remember information about your visit, which can make it easier to visit the site again and make the site more useful to you.</p>
          <p>Similar technologies include web beacons, pixels, and local storage that we use to store information about your visit.</p>
        </div>
      </section>

      <section className="cookie-types">
        <h2>Types of Cookies We Use</h2>
        <div className="cookie-grid">
          {cookieTypes.map((cookie, index) => (
            <div className="cookie-card" key={index}>
              <h3>{cookie.name}</h3>
              <p className="cookie-purpose">{cookie.purpose}</p>
              <div className="examples">
                <h4>Examples:</h4>
                <ul>
                  {cookie.examples.map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cookie-control">
        <h2>Managing Your Cookie Preferences</h2>
        <div className="control-content">
          <p>You can control and/or delete cookies as you wish. Most web browsers allow you to:</p>
          <ul>
            <li>See what cookies you have and delete them individually</li>
            <li>Block third-party cookies</li>
            <li>Block cookies from particular sites</li>
            <li>Block all cookies</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>
          <p>If you disable cookies, some features of our Site may not function properly.</p>
          <button className="preferences-btn">Manage Cookie Preferences</button>
        </div>
      </section>

      <section className="contact-section">
        <h2>Questions About Our Cookie Policy?</h2>
        <p>If you have any questions about how we use cookies, please contact us at:</p>
        <a href="mailto:privacy@addisonBags.com" className="contact-link">privacy@addisonBags.com</a>
      </section>
    </div>
  );
};

export default CookiePolicy;
