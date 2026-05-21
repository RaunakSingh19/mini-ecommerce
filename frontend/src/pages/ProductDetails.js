// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   useParams,
// } from "react-router-dom";

// import API from "../services/api";

// import "./ProductDetails.css";

// const ProductDetails = () => {

//   const { id } = useParams();

//   const [product, setProduct] =
//     useState(null);

//   const [mainImage, setMainImage] =
//     useState("");



//   useEffect(() => {
//     fetchProduct();
//   }, []);



//   const fetchProduct =
//     async () => {

//       try {

//         const { data } =
//           await API.get(
//             `/products/${id}`
//           );

//         setProduct(data);

//         setMainImage(
//           data.images?.[0]
//         );

//       } catch (error) {
//         console.log(error);
//       }
//     };



//   if (!product)
//     return <h2>Loading...</h2>;



//   return (
//     <div className="details-page">

//       <div className="details-container">

//         {/* LEFT */}
//         <div className="details-images">

//           <div className="main-image">
//             <img
//               src={mainImage}
//               alt={product.title}
//             />
//           </div>



//           <div className="thumbnail-row">

//             {product.images.map(
//               (img, index) => (

//                 <img
//                   key={index}
//                   src={img}
//                   alt=""
//                   onClick={() =>
//                     setMainImage(img)
//                   }
//                   className={
//                     mainImage === img
//                       ? "active-thumb"
//                       : ""
//                   }
//                 />

//               )
//             )}

//           </div>

//         </div>



//         {/* RIGHT */}
//         <div className="details-content">

//           <span className="details-category">
//             {
//               product.category
//                 ?.name
//             }
//           </span>

//           <h1>
//             {product.title}
//           </h1>

//           <h2>
//             ₹ {product.price}
//           </h2>

//           <p>
//             {
//               product.description
//             }
//           </p>



//           <div className="stock-info">
//             {product.stock > 0
//               ? "Available"
//               : "Out Of Stock"}
//           </div>



//           <button className="buy-btn">
//             Buy Now
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default ProductDetails;

import {
  useEffect, useState,
} from "react";
import {
  useParams, useNavigate,
} from "react-router-dom";
import API from "../services/api";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
      setMainImage(data.images?.[0]);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) return <h2>Loading...</h2>;

  // NEW: Handler for Buy Now
  const handleBuyNow = () => {
    // Pass product and quantity, default 1 for single buy
    // Optionally, also allow to select size/color before this!
    navigate('/checkout', {
      state: {
        products: [{
          ...product,
          quantity: 1,
          selectedSize: '',      // Fill if you offer selection
          selectedColor: '',     // Fill if variant selected
        }]
      }
    });
  };

  return (
    <div className="details-page">
      <div className="details-container">

        {/* LEFT */}
        <div className="details-images">
          <div className="main-image">
            <img src={mainImage} alt={product.title} />
          </div>
          <div className="thumbnail-row">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setMainImage(img)}
                className={mainImage === img ? "active-thumb" : ""}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="details-content">
          <span className="details-category">{product.category?.name}</span>
          <h1>{product.title}</h1>
          <h2>₹ {product.price}</h2>
          <p>{product.description}</p>
          <div className="stock-info">
            {product.stock > 0 ? "Available" : "Out Of Stock"}
          </div>
          <button
            className="buy-btn"
            onClick={handleBuyNow}
            disabled={product.stock <= 0}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;