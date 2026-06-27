import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(
          `/products/id/${id}`
        );

        const fetchedProduct =
          data.product || data;

        setProduct(fetchedProduct);

        setMainImage(
          fetchedProduct.images?.[0] || ""
        );
      } catch (error) {
        console.error(
          "Product fetch error:",
          error
        );
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return (
      <h2 className="center-text">
        Loading...
      </h2>
    );
  }

  const lowestPrice =
    product.variants?.length > 0
      ? Math.min(
          ...product.variants.map((variant) =>
            Number(variant.price)
          )
        )
      : 0;

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        products: [
          {
            ...product,
            quantity: 1,
          },
        ],
      },
    });
  };

  return (
    <div className="details-page-modern">
      <div className="details-container-modern">

        {/* Images Section */}
        <div className="details-images-wrap">
          <div className="main-image-modern">
            <img
              src={mainImage}
              alt={product.name}
            />
          </div>

          <div className="thumbnail-row">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name}-${index}`}
                onClick={() =>
                  setMainImage(img)
                }
                className={
                  mainImage === img
                    ? "active-thumb"
                    : ""
                }
              />
            ))}
          </div>
        </div>

        {/* Product Content */}
        <div className="details-content-modern">
          <div className="badge-row">
            <span className="details-category">
              {product.category}
            </span>
          </div>

          <h1>{product.name}</h1>

          <div className="modern-price">
            <span>₹{lowestPrice}</span>

            {product.variants?.length > 1 && (
              <span className="modern-price-note">
                Starting From
              </span>
            )}
          </div>

          <p className="desc">
            {product.description ||
              product.shortDescription}
          </p>

          <div
            className={`stock-info-modern ${
              product.isInStock
                ? "active"
                : "notactive"
            }`}
          >
            {product.isInStock
              ? "Available"
              : "Out of Stock"}
          </div>

          <button
            className="buy-btn-modern"
            onClick={handleBuyNow}
            disabled={!product.isInStock}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;