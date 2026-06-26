// import { useState, useEffect } from "react";
// import { ArrowRight, Coffee, Croissant, Sparkles } from "lucide-react";
// import "./CategoriesSection.css";

// const CategoriesSection = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Sample menu items - Replace with API call
//   const sampleMenuItems = [
//     {
//       _id: "1", 
//       name: "Specialty Coffee",
//       description: "Handcrafted coffee blends from around the world",
//       emoji: "☕",
//       accentColor: "#8B4513",
//     },
//     {
//       _id: "2",
//       name: "Pastries & Bakes",
//       description: "Fresh-baked goods made daily in our kitchen",
//       emoji: "🥐",
//       accentColor: "#D2691E",
//     },
//     {
//       _id: "3",
//       name: "Cozy Ambiance",
//       description: "Warm and inviting atmosphere for everyone",
//       emoji: "🕯️",
//       accentColor: "#CD853F",
//     },
//   ];

//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       setMenuItems(sampleMenuItems);
//       setIsLoading(false);
//     }, 500);
//   }, []);

//   return (
//     <section className="cafe-showcase">
//       {/* Welcome Hero Section */}
//       <div className="welcome-banner">
//         <div className="banner-content">
//           <h1 className="banner-title">Welcome to Our Coffee Haven</h1>
//           <p className="banner-subtitle">
//             Discover the perfect blend of aromatic coffee, delicious pastries,
//             and a welcoming community in our cozy corner café.
//           </p>
//           <button className="banner-button">
//             Visit Us Today <ArrowRight size={20} />
//           </button>
//         </div>

//         <div className="highlights-section">
//           <div className="highlight-item highlight-item-1">
//             <div className="highlight-emoji">☕</div>
//             <h3>Premium Beans</h3>
//           </div>
//           <div className="highlight-item highlight-item-2">
//             <div className="highlight-emoji">🎵</div>
//             <h3>Live Music</h3>
//           </div>
//           <div className="highlight-item highlight-item-3">
//             <div className="highlight-emoji">👥</div>
//             <h3>Community Space</h3>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoriesSection;
import React from "react";
import "./CategoriesSection.css";

const CategoriesSection = () => {
  const showcaseFeatures = [
    {
      id: 1,
      title: "Multi-Cuisine",
      description: "One bite and experience a delightful burst of flavours.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      ),
    },
    {
      id: 2,
      title: "Delectable Concoctions",
      description: "Explore flavourful cocktails that are crafted to perfection.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 22H2M6 2l4 12h4L18 2Z"/><path d="M10 14v8M14 14v8"/></svg>
      ),
    },
    {
      id: 3,
      title: "Rustic Ambience",
      description: "Explore Openhouse's rustic timeless decor with a modern touch.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6"/><path d="M2 10h20v5a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5Z"/></svg>
      ),
    },
    {
      id: 4,
      title: "Surreal Vibes",
      description: "With an eclectic decor, Openhouse is all about surreal vibes.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
      ),
    },
  ];

  return (
    <section className="cafe-showcase-container">
      {/* Background Image Wrapper with Tint Overlay */}
      <div className="showcase-bg-overlay">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80" 
          alt="Cafe Ambience" 
          className="showcase-bg-image"
        />
        <div className="dark-tint"></div>
      </div>

      {/* Grid Content */}
      <div className="showcase-grid">
        {showcaseFeatures.map((feature) => (
          <div key={feature.id} className="showcase-column">
            <div className="feature-icon-wrapper">
              {feature.icon}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;