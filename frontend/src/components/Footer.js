import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: "About Us", link: "#" },
    { name: "Menu", link: "#" },
    { name: "Offers", link: "#" },
    { name: "Contact", link: "#" },
    { name: "FAQs", link: "#" },
    { name: "Privacy Policy", link: "#" }
  ];
  
  const socialLinks = [
    { name: "Facebook", icon: "📘", link: "#" },
    { name: "Instagram", icon: "📸", link: "#" },
    { name: "Twitter", icon: "🐦", link: "#" },
    { name: "YouTube", icon: "▶️", link: "#" },
    { name: "TikTok", icon: "🎵", link: "#" }
  ];
  
  const contactInfo = {
    address: "123 Foodie Street, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "hello@foodiehub.com",
    hours: "Mon-Sun: 10:00 AM - 10:00 PM"
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section brand-section">
          <div className="footer-logo">
            <span className="logo-icon">🍽️</span>
            <h3>Foodie<span>Hub</span></h3>
          </div>
          <p className="brand-description">
            Delivering happiness with every bite. Your favorite food destination for delicious meals and unforgettable experiences.
          </p>
          <div className="newsletter">
            <h4>Subscribe to our newsletter</h4>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.link}>
                  <span className="link-arrow">→</span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul className="contact-info">
            <li>
              <span className="contact-icon">📍</span>
              <span>{contactInfo.address}</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span>{contactInfo.phone}</span>
            </li>
            <li>
              <span className="contact-icon">✉️</span>
              <span>{contactInfo.email}</span>
            </li>
            <li>
              <span className="contact-icon">🕐</span>
              <span>{contactInfo.hours}</span>
            </li>
          </ul>
        </div>

        {/* Social & App Section */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.link} 
                className="social-link"
                aria-label={social.name}
              >
                <span className="social-icon">{social.icon}</span>
                <span className="social-name">{social.name}</span>
              </a>
            ))}
          </div>
          
          <div className="app-download">
            <h4>Download App</h4>
            <div className="app-buttons">
              <button className="app-btn">
                <span className="app-icon">📱</span>
                <div className="app-text">
                  <small>Get it on</small>
                  <strong>App Store</strong>
                </div>
              </button>
              <button className="app-btn">
                <span className="app-icon">🤖</span>
                <div className="app-text">
                  <small>Get it on</small>
                  <strong>Google Play</strong>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="payment-methods">
            <span className="payment-icon">💳</span>
            <span className="payment-icon">🏦</span>
            <span className="payment-icon">💵</span>
            <span className="payment-icon">📱</span>
          </div>
          <p className="copyright">
            © {currentYear} FoodieHub. All Rights Reserved. | 
            <a href=""> Terms of Service</a> | 
            <a href=""> Privacy Policy</a>
          </p>
          <div className="footer-badge">
            <span>✨ 100% Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;