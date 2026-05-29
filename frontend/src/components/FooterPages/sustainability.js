import React from 'react';
import './Sustainability.css';
import { FaLeaf, FaRecycle, FaWater, FaSolarPanel, FaTree } from 'react-icons/fa';

const Sustainability = () => {
  const initiatives = [
    {
      title: "Sustainable Materials",
      icon: <FaLeaf className="initiative-icon" />,
      description: "Over 60% of our products now incorporate recycled or renewable materials",
      details: [
        "RPET from plastic bottles",
        "Recycled nylon from fishing nets",
        "Organic cotton and hemp",
        "LWG-certified leathers"
      ]
    },
    {
      title: "Carbon Neutral Shipping",
      icon: <FaTree className="initiative-icon" />,
      description: "We offset 100% of our shipping emissions through verified programs",
      details: [
        "Renewable energy investments",
        "Reforestation projects",
        "Carbon capture initiatives"
      ]
    },
    {
      title: "Water Conservation",
      icon: <FaWater className="initiative-icon" />,
      description: "Reduced water usage by 40% through innovative manufacturing",
      details: [
        "Water recycling systems",
        "Natural dye processes",
        "Eco-friendly tanning"
      ]
    },
    {
      title: "Circular Economy",
      icon: <FaRecycle className="initiative-icon" />,
      description: "Pioneering end-of-life solutions for our products",
      details: [
        "Take-back program",
        "Product refurbishment",
        "Material recycling"
      ]
    },
    {
      title: "Renewable Energy",
      icon: <FaSolarPanel className="initiative-icon" />,
      description: "Our facilities run on 80% renewable energy",
      details: [
        "Solar panel installations",
        "Wind energy contracts",
        "Energy efficiency upgrades"
      ]
    }
  ];

  return (
    <div className="sustainability-container">
      {/* Hero Section */}
      <div className="sustainability-hero">
        <div className="hero-overlay">
          <h1>Our Promise to the Planet</h1>
          <p className="hero-subtitle">Crafting beautiful bags with respect for the environment</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="sustainability-content">
        {/* Introduction */}
        <section className="intro-section">
          <p className="intro-text">
            At Addison, sustainability isn't an afterthought - it's woven into every decision we make. 
            Since 2015, we've been on a journey to minimize our environmental impact while creating 
            products that stand the test of time.
          </p>
        </section>

        {/* Initiatives Grid */}
        <section className="initiatives-section">
          <h2 className="section-title">Our Sustainability Initiatives</h2>
          <div className="initiatives-grid">
            {initiatives.map((initiative, index) => (
              <div key={index} className="initiative-card">
                <div className="initiative-header">
                  <div className="icon-container">
                    {initiative.icon}
                  </div>
                  <h3>{initiative.title}</h3>
                </div>
                <p className="initiative-description">{initiative.description}</p>
                <ul className="initiative-details">
                  {initiative.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Progress Section */}
        <section className="progress-section">
          <h2 className="section-title">Our 2025 Goals</h2>
          <div className="progress-grid">
            <div className="progress-item">
              <div className="progress-bar" style={{ '--percentage': '85%' }}>
                <span>85%</span>
              </div>
              <h3>Sustainable Materials</h3>
              <p>Target: 90% by 2025</p>
            </div>
            <div className="progress-item">
              <div className="progress-bar" style={{ '--percentage': '80%' }}>
                <span>80%</span>
              </div>
              <h3>Renewable Energy</h3>
              <p>Target: 100% by 2025</p>
            </div>
            <div className="progress-item">
              <div className="progress-bar" style={{ '--percentage': '60%' }}>
                <span>60%</span>
              </div>
              <h3>Water Reduction</h3>
              <p>Target: 70% by 2025</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2>Join Our Sustainability Journey</h2>
          <p>
            Every Addison bag you choose supports our environmental initiatives. 
            Together, we're proving that style and sustainability can go hand in hand.
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary">Shop Sustainable Styles</button>
            <button className="cta-button secondary">Learn About Our Efforts</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sustainability;