import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import API from "../services/api";

import "./ProductDetails.css";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [mainImage, setMainImage] =
    useState("");



  useEffect(() => {
    fetchProduct();
  }, []);



  const fetchProduct =
    async () => {

      try {

        const { data } =
          await API.get(
            `/products/${id}`
          );

        setProduct(data);

        setMainImage(
          data.images?.[0]
        );

      } catch (error) {
        console.log(error);
      }
    };



  if (!product)
    return <h2>Loading...</h2>;



  return (
    <div className="details-page">

      <div className="details-container">

        {/* LEFT */}
        <div className="details-images">

          <div className="main-image">
            <img
              src={mainImage}
              alt={product.title}
            />
          </div>



          <div className="thumbnail-row">

            {product.images.map(
              (img, index) => (

                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() =>
                    setMainImage(img)
                  }
                  className={
                    mainImage === img
                      ? "active-thumb"
                      : ""
                  }
                />

              )
            )}

          </div>

        </div>



        {/* RIGHT */}
        <div className="details-content">

          <span className="details-category">
            {
              product.category
                ?.name
            }
          </span>

          <h1>
            {product.title}
          </h1>

          <h2>
            ₹ {product.price}
          </h2>

          <p>
            {
              product.description
            }
          </p>



          <div className="stock-info">
            {product.stock > 0
              ? "Available"
              : "Out Of Stock"}
          </div>



          <button className="buy-btn">
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;