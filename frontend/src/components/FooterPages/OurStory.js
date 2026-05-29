import React from 'react';
import './OurStory.css';
import { FaLeaf, FaRulerCombined, FaHandsHelping } from 'react-icons/fa';

const OurStory = () => {
  return (
    <div className="our-story-container">
      {/* Hero Section */}
      <div className="story-hero">
        <div className="hero-overlay">
          <h1>Our Heritage</h1>
          <p className="hero-subtitle">Crafting timeless bags since 2015</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="story-content">
        {/* Founding Story */}
        <section className="story-section">
          <h2 className="section-title">The Addison Beginning</h2>
          <div className="section-content">
            <div className="text-content">
              <p>In 2015, Sarah Addison set out to solve a personal frustration - the lack of well-crafted bags that could withstand the rigors of daily life while maintaining elegant style. What began as a small workshop in San Francisco has grown into a brand trusted by thousands worldwide.</p>
              <p>Sarah's vision was simple: create bags that people would love to use every day. Not just for how they look, but for how they make life easier.</p>
            </div>
            <div className="image-content">
              <img 
                src="/images/founder-story.jpg" 
                alt="Sarah Addison in her original workshop" 
                className="founder-image"
              />
              <p className="image-caption">Sarah Addison in her original workshop, 2015</p>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="philosophy-section">
          <h2 className="section-title">Our Guiding Principles</h2>
          <div className="principles-grid">
            <div className="principle-card">
              <div className="principle-icon">
                <FaRulerCombined />
              </div>
              <h3>Thoughtful Design</h3>
              <p>Every pocket, zipper, and strap is placed with purpose after hundreds of hours of testing with real users.</p>
            </div>
            <div className="principle-card">
              <div className="principle-icon">
                <FaLeaf />
              </div>
              <h3>Sustainable Practices</h3>
              <p>From sourcing to manufacturing, we prioritize the planet without compromising on quality.</p>
            </div>
            <div className="principle-card">
              <div className="principle-icon">
                <FaHandsHelping />
              </div>
              <h3>Ethical Craftsmanship</h3>
              <p>We partner with skilled artisans who are paid fair wages and work in safe conditions.</p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="timeline-section">
          <h2 className="section-title">Our Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2015</div>
              <div className="timeline-content">
                <h3>Founded in San Francisco</h3>
                <p>Sarah opens a small workshop producing handmade leather backpacks</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2017</div>
              <div className="timeline-content">
                <h3>First Retail Partnership</h3>
                <p>Our bags debut in select boutique stores across California</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>Sustainable Materials Initiative</h3>
                <p>We transition 60% of our line to recycled and eco-friendly materials</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>International Expansion</h3>
                <p>Addison bags now available in 15 countries worldwide</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="story-cta">
          <h2>Become Part of Our Story</h2>
          <p>Discover the Addison difference for yourself</p>
          <button className="cta-button">Shop Our Collections</button>
        </section>
      </div>
    </div>
  );
};

export default OurStory;