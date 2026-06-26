import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  // Prevent crashes if product is missing
  if (!product) return null;

  // Hide inactive products
  if (!product.isActive) return null;

  // Product image fallback
  const image =
    product.images?.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/400x300?text=No+Image";

  // Lowest variant price
  const lowestPrice =
    Array.isArray(product.variants) &&
    product.variants.length > 0
      ? Math.min(
          ...product.variants.map((variant) =>
            Number(variant.price)
          )
        )
      : 0;

  return (
    <Link
      to={`/product/${product._id}`}
      className="product-link"
    >
      <div className="product-card">
        {/* Product Image */}
        <div className="product-image">
          <img
            src={image}
            alt={product.name}
            loading="lazy"
          />

          <span className="product-category">
            {product.category || "Food"}
          </span>
        </div>

        {/* Product Content */}
        <div className="product-content">
          <h3 className="product-title">
            {product.name}
          </h3>

          <p className="short-desc">
            {product.shortDescription ||
              "Delicious food prepared with care."}
          </p>

          <div className="product-bottom">
            <span className="price">
              ₹{lowestPrice}
            </span>

            <span
              className={`stock ${
                product.isInStock
                  ? "in-stock"
                  : "out-stock"
              }`}
            >
              {product.isInStock
                ? "Available"
                : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 