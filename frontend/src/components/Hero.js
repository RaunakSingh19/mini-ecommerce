import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Hero.css";

const Hero = () => {
  const [heroes, setHeroes] = useState([]);

  const fetchHeroes = useCallback(async () => {
    try {
      const { data } = await API.get("/heroes");
      setHeroes(data);
    } catch (error) {
      console.error("Failed to fetch heroes:", error);
    }
  }, []);

  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  return (
    <div className="hero-wrapper">
      {heroes.map((hero) => {
        const isBackgroundLayout =
          hero.layoutType === "center-content" ||
          hero.layoutType === "background-image";

        return (
          <section
            key={hero._id}
            className={`hero-section ${hero.layoutType}`}
            style={{
              backgroundColor:
                hero.backgroundColor || "#000",

              backgroundImage: isBackgroundLayout
                ? `linear-gradient(
                    rgba(0,0,0,0.55),
                    rgba(0,0,0,0.55)
                  ),
                  url(${hero.image})`
                : "none",
            }}
          >
            {/* LEFT IMAGE */}
            {hero.layoutType === "left-image" && (
              <div className="hero-image">
                <img
                  src={hero.image}
                  alt={hero.title}
                />
              </div>
            )}

            {/* CONTENT */}
            {hero.layoutType !==
              "image-only" && (
              <div className="hero-content">
                {/* BADGE */}
                <span
                  className="hero-badge"
                  style={{
                    background:
                      hero.badgeColor ||
                      "#ffffff",

                    color:
                      hero.badgeTextColor ||
                      "#000000",
                  }}
                >
                  Premium Experience
                </span>

                {/* TITLE */}
                <h1
                  style={{
                    color:
                      hero.titleColor ||
                      "#ffffff",
                  }}
                >
                  {hero.title}
                </h1>

                {/* SUBTITLE */}
                {hero.subtitle && (
                  <h3
                    style={{
                      color:
                        hero.subtitleColor ||
                        "#e2e8f0",
                    }}
                  >
                    {hero.subtitle}
                  </h3>
                )}

                {/* DESCRIPTION */}
                <p
                  style={{
                    color:
                      hero.descriptionColor ||
                      "#cbd5e1",
                  }}
                >
                  {hero.description}
                </p>

                {/* BUTTONS */}
                <div className="hero-buttons">
                  {hero.buttonText && (
                    <Link
                      to={hero.buttonLink}
                      className="hero-btn"
                      style={{
                        background:
                          hero.buttonColor ||
                          "#ef4444",

                        color:
                          hero.buttonTextColor ||
                          "#ffffff",
                      }}
                    >
                      {hero.buttonText}
                    </Link>
                  )}

                  <button className="hero-outline-btn">
                    Explore More
                  </button>
                </div>
              </div>
            )}

            {/* RIGHT IMAGE */}
            {hero.layoutType ===
              "right-image" && (
              <div className="hero-image">
                <img
                  src={hero.image}
                  alt={hero.title}
                />
              </div>
            )}

            {/* IMAGE ONLY */}
            {hero.layoutType ===
              "image-only" && (
              <div className="hero-full-image">
                <img
                  src={hero.image}
                  alt={hero.title}
                />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default Hero;