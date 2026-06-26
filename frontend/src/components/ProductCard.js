// import { Link } from "react-router-dom";
// import "./ProductCard.css";

// const ProductCard = ({ product }) => {
//   // ❗ Don't show this card at all if product is not active
//   if (!product.isActive) return null;

//   return (
//     <Link
//       to={`/product/${product._id}`}
//       className="product-link"
//     >
//       <div className="product-card">
//         <div className="product-image">
//           <img
//             src={product.images?.[0]}
//             alt={product.title}
//           />
//           <span className="product-category">
//             {product.category?.name}
//           </span>
//         </div>
//         <div className="product-content">
//           <h3>{product.title}</h3>
//           <p className="short-desc">{product.shortDescription}</p>
//           <div className="product-bottom">
//             <span className="price">
//               ₹{" "}
//               {Array.isArray(product.variants) && product.variants.length
//                 ? Math.min(...product.variants.map(v => Number(v.price)))
//                 : product.price}
//             </span>
//             {/* Updated to use isActive */}
//             <span className="stock">
//               {product.isActive ? "Available" : "Not Available"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;
// import { Link } from "react-router-dom";
// import "./ProductCard.css";

// const ProductCard = ({ product }) => {
//   if (!product.isActive) return null;

//   const lowestPrice =
//     product.variants?.length > 0
//       ? Math.min(
//           ...product.variants.map(v =>
//             Number(v.price)
//           )
//         )
//       : 0;

//   return (
//     <Link
//       to={`/product/${product._id}`}
//       className="product-link"
//     >
//       <div className="product-card">
//         <div className="product-image">
//           <img
//             src={product.images?.[0]}
//             alt={product.name}
//           />

//           <span className="product-category">
//             {product.category}
//           </span>
//         </div>

//         <div className="product-content">
//           <h3>{product.name}</h3>

//           <p className="short-desc">
//             {product.shortDescription}
//           </p>
//           <div className="product-bottom">
//             <span className="price">
//               ₹{lowestPrice}
//             </span>

//             <span className="stock">
//               {product.isInStock
//                 ? "Available"
//                 : "Out of Stock"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };
// export default ProductCard;
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