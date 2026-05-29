// import "./Footer.css";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();
  
//   const quickLinks = [
//     { name: "About Us", link: "#" },
//     { name: "Menu", link: "#" },
//     { name: "Offers", link: "#" },
//     { name: "Contact", link: "#" },
//     { name: "FAQs", link: "#" },
//     { name: "Privacy Policy", link: "#" }
//   ];
  
//   const socialLinks = [
//     { name: "Facebook", icon: "📘", link: "#" },
//     { name: "Instagram", icon: "📸", link: "#" },
//     { name: "Twitter", icon: "🐦", link: "#" },
//     { name: "YouTube", icon: "▶️", link: "#" },
//     { name: "TikTok", icon: "🎵", link: "#" }
//   ];
  
//   const contactInfo = {
//     address: "123 Foodie Street, New York, NY 10001",
//     phone: "+1 (555) 123-4567",
//     email: "hello@foodiehub.com",
//     hours: "Mon-Sun: 10:00 AM - 10:00 PM"
//   };

//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         {/* Brand Section */}
//         <div className="footer-section brand-section">
//           <div className="footer-logo">
//             <span className="logo-icon">🍽️</span>
//             <h3>Foodie<span>Hub</span></h3>
//           </div>
//           <p className="brand-description">
//             Delivering happiness with every bite. Your favorite food destination for delicious meals and unforgettable experiences.
//           </p>
//           <div className="newsletter">
//             <h4>Subscribe to our newsletter</h4>
//             <div className="newsletter-form">
//               <input type="email" placeholder="Enter your email" />
//               <button>Subscribe</button>
//             </div>
//           </div>
//         </div>

//         {/* Quick Links Section */}
//         <div className="footer-section">
//           <h4>Quick Links</h4>
//           <ul className="footer-links">
//             {quickLinks.map((link, index) => (
//               <li key={index}>
//                 <a href={link.link}>
//                   <span className="link-arrow">→</span>
//                   {link.name}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Contact Info Section */}
//         <div className="footer-section">
//           <h4>Contact Info</h4>
//           <ul className="contact-info">
//             <li>
//               <span className="contact-icon">📍</span>
//               <span>{contactInfo.address}</span>
//             </li>
//             <li>
//               <span className="contact-icon">📞</span>
//               <span>{contactInfo.phone}</span>
//             </li>
//             <li>
//               <span className="contact-icon">✉️</span>
//               <span>{contactInfo.email}</span>
//             </li>
//             <li>
//               <span className="contact-icon">🕐</span>
//               <span>{contactInfo.hours}</span>
//             </li>
//           </ul>
//         </div>

//         {/* Social & App Section */}
//         <div className="footer-section">
//           <h4>Follow Us</h4>
//           <div className="social-links">
//             {socialLinks.map((social, index) => (
//               <a 
//                 key={index} 
//                 href={social.link} 
//                 className="social-link"
//                 aria-label={social.name}
//               >
//                 <span className="social-icon">{social.icon}</span>
//                 <span className="social-name">{social.name}</span>
//               </a>
//             ))}
//           </div>
          
//           <div className="app-download">
//             <h4>Download App</h4>
//             <div className="app-buttons">
//               <button className="app-btn">
//                 <span className="app-icon">📱</span>
//                 <div className="app-text">
//                   <small>Get it on</small>
//                   <strong>App Store</strong>
//                 </div>
//               </button>
//               <button className="app-btn">
//                 <span className="app-icon">🤖</span>
//                 <div className="app-text">
//                   <small>Get it on</small>
//                   <strong>Google Play</strong>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Payment Methods & Copyright */}
//       <div className="footer-bottom">
//         <div className="footer-bottom-content">
//           <div className="payment-methods">
//             <span className="payment-icon">💳</span>
//             <span className="payment-icon">🏦</span>
//             <span className="payment-icon">💵</span>
//             <span className="payment-icon">📱</span>
//           </div>
//           <p className="copyright">
//             © {currentYear} FoodieHub. All Rights Reserved. | 
//             <a href=""> Terms of Service</a> | 
//             <a href=""> Privacy Policy</a>
//           </p>
//           <div className="footer-badge">
//             <span>✨ 100% Secure Payments</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
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
          
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaPinterest /></a>
            </div>
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