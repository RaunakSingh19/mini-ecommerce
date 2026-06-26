import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-newsletter">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest products and offers</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
          </div>
          
          <div className="social-icons">
  <a
    href="https://facebook.com/yourpage"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <FaFacebook />
  </a>

  <a
    href="https://instagram.com/yourpage"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <FaInstagram />
  </a>

  <a
    href="https://twitter.com/yourpage"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Twitter"
  >
    <FaTwitter />
  </a>

  <a
    href="https://pinterest.com/yourpage"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Pinterest"
  >
    <FaPinterest />
  </a>
</div>
        </div>

        {/* Middle Section - Links */}
        <div className="footer-middle">
          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/products">All Products</Link></li>
              {/* <li><Link to="/new-arrivals">New Arrivals</Link></li> */}
              <li><Link to="/best-sellers">Location</Link></li>
              <li><Link to="/sale">Gallery </Link></li>
              <li><Link to="/category/backpacks">Menue</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Help</h4>
            <ul>
              <li><Link to="/footer-pages/faqs">FAQs</Link></li>
              <li><Link to="/footer-pages/shipping">Parsal Info</Link></li>
              <li><Link to="/footer-pages/returns">Returns & Exchanges</Link></li>
              {/* <li><Link to="/footer-pages/size-guide">Size Guide</Link></li> */}
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li><Link to="/footer-pages/our-story">Our Story</Link></li>
              <li><Link to="/footer-pages/sustainability">Sustainability</Link></li>
              <li><Link to="/footer-pages/materials">Materials</Link></li>
              <li><Link to="/footer-pages/careers">Careers</Link></li>
              {/* <li><Link to="/footer-pages/cookie-policy">Careers</Link></li> */}
              {/* <li><Link to="/blog">Blog</Link></li>  */}
            </ul>
          </div>
          
          <div className="footer-column contact-info">
            <h4>Contact</h4>
            <ul>
              <li><MdEmail /> <span>info@MyFood.com</span></li>
              <li><MdPhone /> <span>+1 (555) 123-4567</span></li>
              <li><MdLocationOn /> <span> Badlapur Street Market, Near Railway Station, 421503</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="payment-methods">
            <img src="/images/visa.png" alt="Visa" />
            <img src="/images/mastercard.png" alt="Mastercard" />
            <img src="/images/paypal.png" alt="PayPal" />
            <img src="/images/apple-pay.png" alt="Apple Pay" />
          </div>
          
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} Bag Store. All rights reserved.</p>
            <div className="legal-links">
              <Link to="/footer-pages/privacy-policy">Privacy Policy</Link>
              <Link to="/footer-pages/terms">Terms of Service</Link>
              <Link to="/footer-pages/cookie-policy">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;