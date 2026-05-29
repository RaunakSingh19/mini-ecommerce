import React from 'react';
import './Careers.css';
import { FaBriefcase, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const CareersPage = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Product Designer",
      type: "Full-time",
      location: "San Francisco, CA (Hybrid)",
      salary: "$90,000 - $120,000",
      description: "Lead the design of our next generation of sustainable bags and accessories. You'll work closely with our product team to create functional, beautiful products that our customers will love.",
      requirements: [
        "5+ years product design experience",
        "Strong portfolio showcasing UX/UI skills",
        "Proficiency in Figma and Adobe Creative Suite",
        "Experience with sustainable materials"
      ],
      perks: [
        "Flexible work arrangements",
        "Annual education stipend",
        "Product discounts",
        "Wellness benefits"
      ]
    },
    {
      id: 2,
      title: "Customer Experience Manager",
      type: "Full-time",
      location: "Remote",
      salary: "$75,000 - $95,000",
      description: "Build and lead our customer service team to deliver exceptional experiences. You'll develop processes, train team members, and ensure customer satisfaction across all touchpoints.",
      requirements: [
        "3+ years in customer service leadership",
        "Excellent communication skills",
        "Experience with CRM systems",
        "Problem-solving mindset"
      ],
      perks: [
        "Fully remote position",
        "Performance bonuses",
        "Generous PTO",
        "Team retreats"
      ]
    },
    {
      id: 3,
      title: "Sustainability Coordinator",
      type: "Full-time",
      location: "Portland, OR",
      salary: "$65,000 - $85,000",
      description: "Drive our sustainability initiatives by researching and implementing eco-friendly practices across our supply chain and operations.",
      requirements: [
        "Degree in Environmental Science or related field",
        "2+ years in sustainability role",
        "Project management experience",
        "Passion for circular economy"
      ],
      perks: [
        "Green commuting stipend",
        "Volunteer time off",
        "Sustainable product allowance",
        "Onsite wellness programs"
      ]
    }
  ];

  return (
    <div className="careers-container">
      <header className="careers-hero">
        <div className="hero-content">
          <h1>Build the Future of Sustainable Bags</h1>
          <p>Join our mission to create beautiful, functional products that respect both people and planet</p>
          <button className="cta-button">Why Work With Us</button>
        </div>
      </header>

      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon sustainability"></div>
            <h3>Sustainability First</h3>
            <p>We prioritize eco-friendly materials and ethical production in everything we make</p>
          </div>
          <div className="value-card">
            <div className="value-icon innovation"></div>
            <h3>Innovation Driven</h3>
            <p>We challenge conventions to create products that solve real problems</p>
          </div>
          <div className="value-card">
            <div className="value-icon people"></div>
            <h3>People Focused</h3>
            <p>We invest in our team's growth and wellbeing as much as our products</p>
          </div>
        </div>
      </section>

      <section className="open-positions">
        <div className="section-header">
          <h2>Current Openings</h2>
          <div className="filter-controls">
            <button className="filter-btn active">All Positions</button>
            <button className="filter-btn">Design</button>
            <button className="filter-btn">Operations</button>
            <button className="filter-btn">Remote</button>
          </div>
        </div>

        <div className="jobs-list">
          {jobOpenings.map(job => (
            <div className="job-card" key={job.id}>
              <div className="job-header">
                <h3>{job.title}</h3>
                <div className="job-meta">
                  <span><FaBriefcase /> {job.type}</span>
                  <span><FaMapMarkerAlt /> {job.location}</span>
                  <span><FaDollarSign /> {job.salary}</span>
                </div>
              </div>
              
              <div className="job-content">
                <p className="job-description">{job.description}</p>
                
                <div className="job-details">
                  <div className="requirements">
                    <h4>Requirements</h4>
                    <ul>
                      {job.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="perks">
                    <h4>Perks & Benefits</h4>
                    <ul>
                      {job.perks.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <a 
                href={`mailto:careers@addisonBags.com?subject=Application for ${job.title}`} 
                className="apply-button"
              >
                <MdEmail /> Apply Now
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="benefits-section">
        <h2>Employee Benefits</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <h3>Health & Wellness</h3>
            <p>Comprehensive medical, dental, and vision coverage</p>
          </div>
          <div className="benefit-item">
            <h3>Learning & Growth</h3>
            <p>$2,000 annual stipend for professional development</p>
          </div>
          <div className="benefit-item">
            <h3>Work Flexibility</h3>
            <p>Hybrid/remote options and flexible hours</p>
          </div>
          <div className="benefit-item">
            <h3>Product Discounts</h3>
            <p>50% off all Addison products + seasonal freebies</p>
          </div>
          <div className="benefit-item">
            <h3>Time Off</h3>
            <p>Unlimited PTO + paid parental leave</p>
          </div>
          <div className="benefit-item">
            <h3>Retirement</h3>
            <p>401(k) with 4% company match</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Don't See Your Dream Role?</h2>
        <p>We're always looking for talented individuals. Send us your resume and tell us how you can contribute to our mission.</p>
        <a href="mailto:careers@addisonBags.com" className="cta-button">Submit General Application</a>
      </section>
    </div>
  );
};

export default CareersPage;