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
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  // ❗ Don't show this card at all if product is not active
  if (!product.isActive) return null;

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
          <h3>{product.title}</h3>
          <p className="short-desc">{product.shortDescription}</p>
          <div className="product-bottom">
            <span className="price">
              ₹{" "}
              {Array.isArray(product.variants) && product.variants.length
                ? Math.min(...product.variants.map(v => Number(v.price)))
                : product.price}
            </span>
            {/* Updated to use isActive */}
            <span className="stock">
              {product.isActive ? "Available" : "Not Available"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;