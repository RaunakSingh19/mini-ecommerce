import React from "react";
import "./Footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
} from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* Newsletter */}
        <div className="footer-top">
          <div className="footer-newsletter">
            <h3>Stay Updated</h3>
            <p>
              Subscribe to receive updates about our latest dishes,
              offers, and events.
            </p>

            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
              />
              <button type="button">
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Icons */}
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>

            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
            >
              <FaPinterest />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-middle">

          <div className="footer-column">
            <h4>Restaurant</h4>
            <ul>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/location">Location</Link>
              </li>
              <li>
                <Link to="/offers">Offers</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li>
                <Link to="/faqs">FAQs</Link>
              </li>
              <li>
                <Link to="/delivery">Delivery Info</Link>
              </li>
              <li>
                <Link to="/returns">Returns</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>About Us</h4>
            <ul>
              <li>
                <Link to="/about">Our Story</Link>
              </li>
              <li>
                <Link to="/team">Our Team</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column contact-info">
            <h4>Contact</h4>

            <ul>
              <li>
                <MdEmail />
                <span>info@myfood.com</span>
              </li>

              <li>
                <MdPhone />
                <span>+91 9876543210</span>
              </li>

              <li>
                <MdLocationOn />
                <span>
                  Badlapur Street Market,
                  Near Railway Station,
                  Maharashtra 421503
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>
              © {new Date().getFullYear()} My Food.
              All rights reserved.
            </p>

            <div className="legal-links">
              <Link to="/privacy-policy">
                Privacy Policy
              </Link>

              <Link to="/terms">
                Terms of Service
              </Link>

              <Link to="/cookie-policy">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;