import { useState } from "react";
import "./Gallery.css";

import food1 from "../assets/gallery/food1.jpg";
import food2 from "../assets/gallery/food2.jpg";
import food3 from "../assets/gallery/food3.jpg";

import drink1 from "../assets/gallery/drink1.jpg";
import drink2 from "../assets/gallery/drink2.jpg";

import ambience1 from "../assets/gallery/ambience1.jpg";
import ambience2 from "../assets/gallery/ambience2.jpg";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const images = [
  {
    category: "Food",
    title: "Signature Dishes",
    image: food1,
  },
  {
    category: "Food",
    title: "Chef's Special",
    image: food2,
  },
  {
    category: "Food",
    title: "Fine Dining",
    image: food3,
  },
  {
    category: "Drinks",
    title: "Artisan Coffee",
    image: drink1,
  },
  {
    category: "Drinks",
    title: "Signature Drinks",
    image: drink2,
  },
  {
    category: "Ambience",
    title: "Elegant Interiors",
    image: ambience1,
  },
  {
    category: "Ambience",
    title: "Luxury Seating",
    image: ambience2,
  },
];

const Gallery = () => {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? images
      : images.filter(
          (item) =>
            item.category === active
        );

  return (
    <>
      <Navbar />

      <section className="gallery-hero">
        <div className="gallery-overlay"></div>

        <div className="gallery-content">
          <span>OUR GALLERY</span>

          <h1>
            Experiences Worth
            <br />
            Remembering
          </h1>
        </div>
      </section>

      <section className="gallery-section">

        <div className="gallery-tabs">
          {[
            "All",
            "Food",
            "Drinks",
            "Ambience",
          ].map((item) => (
            <button
              key={item}
              className={
                active === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActive(item)
              }
            >
              {item}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filtered.map(
            (item, index) => (
              <div
                className={`gallery-card ${
                  index % 4 === 0
                    ? "large"
                    : ""
                }`}
                key={index}
              >
                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="gallery-info">
                  <span>
                    {item.category}
                  </span>

                  <h3>
                    {item.title}
                  </h3>
                </div>
              </div>
            )
          )}
        </div>

      </section>

      <Footer />
    </>
  );
};

export default Gallery;