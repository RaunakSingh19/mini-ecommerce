import React, { useState, useEffect } from 'react';
import './ThirdHomeSection.css';
import bagImage1 from '../assets/images/5.jpg';
import bagImage2 from '../assets/images/2.jpg';
import bagImage3 from '../assets/images/3.jpg';
import bagImage4 from '../assets/images/4.jpg';

const images = [bagImage1, bagImage2, bagImage3, bagImage4];

const ThirdSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handlePaginationClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="third-section-poster">
      <div className="poster-content">
        <div className="poster-text">
          <h1>Flavors That Keep You Coming Back</h1>
          <p className="poster-description">
            From freshly brewed coffee to delicious handcrafted meals, we bring you flavors made
  with passion and quality ingredients. Whether you're here for a quick bite, a cozy
  café moment, or a hearty meal with loved ones, every dish is prepared to delight your
  taste buds and create memorable experiences.
          </p>
          <div className="explore-tag">EXPLORE MORE COLLECTIONS</div>
        </div>

        <div className="poster-image-container">
          <img
            src={images[currentIndex]}
            alt={`Backpack ${currentIndex + 1}`}
            className="poster-image"
          />
          <div className="image-pagination">
            {images.map((_, index) => (
              <span
                key={index}
                className={index === currentIndex ? 'active' : ''}
                onClick={() => handlePaginationClick(index)}
              >
                {`0${index + 1}`}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;