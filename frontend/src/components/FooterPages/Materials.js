import React from 'react';
import './Materials.css';
import { FaLeaf, FaRecycle, FaTint, FaWeight } from 'react-icons/fa';

const Materials = () => {
  const materialCategories = [
    {
      name: "Premium Leathers",
      description: "Sourced from environmentally-responsible tanneries",
      materials: [
        {
          name: "Full-Grain Leather",
          properties: ["Develops rich patina", "Naturally durable", "LWG-certified tanneries"],
          sustainability: "Gold-rated by Leather Working Group",
          icon: <FaLeaf />
        },
        {
          name: "Vegetable-Tanned Leather",
          properties: ["Chemical-free tanning", "Biodegradable", "Ages beautifully"],
          sustainability: "100% natural tanning process",
          icon: <FaRecycle />
        }
      ]
    },
    {
      name: "Eco-Friendly Fabrics",
      description: "Innovative materials with minimal environmental impact",
      materials: [
        {
          name: "Recycled Canvas",
          properties: ["Made from 100% recycled cotton", "Water-resistant", "Softens with age"],
          sustainability: "Saves 2,000 liters of water per yard",
          icon: <FaTint />
        },
        {
          name: "Ocean Nylon",
          properties: ["From recycled fishing nets", "Lightweight", "Extremely durable"],
          sustainability: "Removes waste from marine ecosystems",
          icon: <FaRecycle />
        }
      ]
    },
    {
      name: "Hardware & Components",
      description: "Designed for longevity and minimal environmental impact",
      materials: [
        {
          name: "Recycled Brass",
          properties: ["Corrosion-resistant", "Develops natural patina", "Heavy-duty"],
          sustainability: "85% post-consumer recycled content",
          icon: <FaWeight />
        },
        {
          name: "YKK Eco Zippers",
          properties: ["Smooth operation", "Long-lasting", "Recyclable"],
          sustainability: "Made with 30% recycled materials",
          icon: <FaRecycle />
        }
      ]
    }
  ];

  return (
    <div className="materials-container">
      {/* Hero Section */}
      <div className="materials-hero">
        <div className="hero-overlay">
          <h1>Craftsmanship in Every Fiber</h1>
          <p className="hero-subtitle">Discover the materials behind our enduring designs</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="materials-content">
        <section className="intro-section">
          <p className="intro-text">
            At Addison, we meticulously select each material for its quality, durability, and environmental responsibility. 
            Our commitment to sustainable sourcing means every bag tells a story of thoughtful craftsmanship.
          </p>
        </section>

        {/* Material Categories */}
        {materialCategories.map((category, index) => (
          <section key={index} className="material-category">
            <h2 className="category-title">{category.name}</h2>
            <p className="category-description">{category.description}</p>
            
            <div className="materials-grid">
              {category.materials.map((material, matIndex) => (
                <div key={matIndex} className="material-card">
                  <div className="material-header">
                    <div className="material-icon">
                      {material.icon}
                    </div>
                    <h3>{material.name}</h3>
                  </div>
                  
                  <div className="material-details">
                    <h4>Properties:</h4>
                    <ul>
                      {material.properties.map((prop, propIndex) => (
                        <li key={propIndex}>{prop}</li>
                      ))}
                    </ul>
                    
                    <div className="sustainability-badge">
                      <span className="badge-icon"><FaLeaf /></span>
                      <span>{material.sustainability}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Sustainability Commitment */}
        <section className="commitment-section">
          <h2 className="section-title">Our Sustainability Promise</h2>
          <div className="commitment-content">
            <p>
              We're committed to continuously improving our material choices. By 2025, 90% of our materials 
              will be recycled, organic, or sustainably sourced. Each year we publish our progress toward 
              complete sustainability.
            </p>
            <button className="sustainability-btn">View Our Sustainability Report</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Materials;