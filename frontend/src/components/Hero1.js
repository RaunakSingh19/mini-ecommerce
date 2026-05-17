import "./Hero1.css";

const Hero1 = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-badge">Now Open: 24/7 Delivery</span>
        <h1>
          Delicious Food <br />
          <span>Delivered Fast</span>
        </h1>
        <p>
          Experience the art of fine dining from the comfort of your home. 
          Freshly sourced, chef-prepared, and delivered in under 30 minutes.
        </p>
        <div className="hero-btns">
          <button className="btn-primary">Explore Menu</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Hero1;