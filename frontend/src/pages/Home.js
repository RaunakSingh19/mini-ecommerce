// import { useEffect, useState } from "react";

// import API from "../services/api";

// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Footer from "../components/Footer";
// import Features from "../components/Features";
// import Category from "../components/Catogery";
// import ProductCard from "../components/ProductCard";

// import "./Home.css";

// const Home = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const { data } = await API.get("/products");

//       setProducts(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <Category />  
//       <section className="menu-section">
//         <h2>Featured Menu</h2>

//       <div className="products-grid">

//   {products.map((product) => (

//     <ProductCard
//       key={product._id}
//       product={product}
//     />

//   ))}

// </div>
//       </section>

//       <Features />
//       <Footer />
//     </>
//   );
// };

// export default Home;
import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Hero1 from "../components/Hero1";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Category from "../components/Catogery";
import ProductCard from "../components/ProductCard";

import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // FILTER PRODUCTS
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category?._id ===
          selectedCategory
      )
    : products;

  return (
    <>
      <Navbar />
        <Hero1 />
      <Hero />

      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={
          setSelectedCategory
        }
      />

      <section className="menu-section">
        <h2>Featured Menu</h2>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))
          ) : (
            <h3>No Products Found</h3>
          )}
        </div>
      </section>

      <Features />

      <Footer />
    </>
  );
};

export default Home;