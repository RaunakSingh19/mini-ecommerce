import { Link } from "react-router-dom";

import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (

    <Link
      to={`/product/${product._id}`}
      className="product-link"
    >

      <div className="product-card">

        <div className="product-image">

          <img
            src={product.images?.[0]}
            alt={product.title}
          />

          <span className="product-category">
            {product.category?.name}
          </span>

        </div>



        <div className="product-content">

          <h3>
            {product.title}
          </h3>

          <p className="short-desc">
            {
              product.shortDescription
            }
          </p>

          <div className="product-bottom">

            <span className="price">
              ₹ {product.price}
            </span>

            <span className="stock">
              {product.stock > 0
                ? "In Stock"
                : "Out Of Stock"}
            </span>

          </div>

        </div>

      </div>

    </Link>
  );
};

export default ProductCard;