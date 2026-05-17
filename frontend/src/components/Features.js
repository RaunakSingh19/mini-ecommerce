import "./Features.css";

const Features = () => {
  return (
    <section className="features">
      <div className="feature-card">
        <div className="feature-circle">🚀</div>
        <h4>Fast Delivery</h4>
        <p>Your food at your door in under 30 minutes.</p>
      </div>
      <div className="feature-card highlighted">
        <div className="feature-circle">✨</div>
        <h4>Fresh Quality</h4>
        <p>Sourced from local organic farms every day.</p>
      </div>
      <div className="feature-card">
        <div className="feature-circle">💳</div>
        <h4>Easy Payments</h4>
        <p>Multiple secure payment options available.</p>
      </div>
    </section>
  );
};

export default Features;