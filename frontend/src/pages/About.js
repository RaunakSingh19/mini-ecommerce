import "./About.css";

const About = () => {
return ( <div className="about-page">

  <section className="about-hero">
    <div className="about-overlay"></div>

    <div className="about-hero-content">
      <span>OUR STORY</span>
      <h1>
        More Than A Café.
        <br />
        A Place To Belong.
      </h1>
    </div>
  </section>

  <section className="about-section">
    <div className="about-container">
      <span className="section-label">
        OUR BEGINNING
      </span>

      <h2>Where Passion Became A Place</h2>

      <p>
        Our café began with a simple vision:
        to create a warm space where great
        food, meaningful conversations, and
        memorable experiences come together.
      </p>

      <p>
        Inspired by the culture of slow
        dining and handcrafted experiences,
        we built a place where every guest
        feels welcomed and every dish tells
        a story.
      </p>
    </div>
  </section>

  <section className="dark-section">
    <div className="about-container">
      <span className="section-label">
        OUR PHILOSOPHY
      </span>

      <h2>Fresh Ingredients. Honest Food.</h2>

      <p>
        We believe food should be prepared
        with care, served with warmth, and
        enjoyed without hurry.
      </p>

      <p>
        Every ingredient is carefully
        selected, every recipe is refined,
        and every plate is crafted to create
        moments worth remembering.
      </p>
    </div>
  </section>

  <section className="about-section">
    <div className="about-container">
      <span className="section-label">
        THE EXPERIENCE
      </span>

      <h2>Designed For Conversations</h2>

      <p>
        From rustic interiors to ambient
        lighting and curated music, every
        detail has been thoughtfully created
        to provide comfort and connection.
      </p>

      <p>
        Whether you're meeting friends,
        enjoying coffee alone, or celebrating
        special moments, our café is designed
        to feel like your second home.
      </p>
    </div>
  </section>

  <section className="vision-section">
    <blockquote>
      "Our mission is to create experiences
      that bring people together through
      exceptional food, warm hospitality,
      and unforgettable moments."
    </blockquote>
  </section>
</div>


);
};

export default About;
