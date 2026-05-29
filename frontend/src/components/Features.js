// import "./Features.css";

// const Features = () => {
//   return (
//     <section className="features">
//       <div className="feature-card">
//         <div className="feature-circle">🚀</div>
//         <h4>Fast Delivery</h4>
//         <p>Your food at your door in under 30 minutes.</p>
//       </div>
//       <div className="feature-card highlighted">
//         <div className="feature-circle">✨</div>
//         <h4>Fresh Quality</h4>
//         <p>Sourced from local organic farms every day.</p>
//       </div>
//       <div className="feature-card">
//         <div className="feature-circle">💳</div>
//         <h4>Easy Payments</h4>
//         <p>Multiple secure payment options available.</p>
//       </div>
//     </section>
//   );
// };

// export default Features;



// jsx name=src/components/FeaturedFoods.jsx
import { useState, useEffect } from "react";
import "./Features.css";
import API from "../services/api";
import { Star, Heart } from "lucide-react";

const FeaturedFoods = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        // Get first 6 products
        setProducts(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getMinPrice = (product) => {
    if (!product.variants || product.variants.length === 0) return "N/A";
    const prices = product.variants.map(v => Number(v.price));
    return Math.min(...prices);
  };

  return (
    <section className="featured-foods">
      <div className="section-header">
        <h2>Featured Delights</h2>
        <p>Handpicked fresh food items curated just for you</p>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "featured" ? "active" : ""}`}
          onClick={() => setActiveTab("featured")}
        >
          Featured
        </button>
        <button
          className={`tab-btn ${activeTab === "bestseller" ? "active" : ""}`}
          onClick={() => setActiveTab("bestseller")}
        >
          Best Sellers
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading delicious items...</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image-wrapper">
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.title}
                  className="product-image"
                />
                <div className={`availability ${product.isActive ? "available" : "unavailable"}`}>
                  {product.isActive ? "Available" : "Sold Out"}
                </div>
                <button className="wishlist-btn">
                  <Heart size={20} />
                </button>
              </div>

              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="description">{product.shortDescription}</p>

                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#ffc107" color="#ffc107" />
                  ))}
                  <span>(128)</span>
                </div>

                <div className="product-footer">
                  <div className="price">
                    <span className="current">₹{getMinPrice(product)}</span>
                    {product.variants?.length > 1 && (
                      <span className="note">Starting</span>
                    )}
                  </div>
                  <button className="add-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="view-all">
        <button className="btn-view-all">Explore All Items →</button>
      </div>
    </section>
  );
};

export default FeaturedFoods;