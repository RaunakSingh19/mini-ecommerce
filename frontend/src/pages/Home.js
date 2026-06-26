  // import { useEffect, useState } from "react";

  // import API from "../services/api";

  // import Navbar from "../components/Navbar";
  // import Hero from "../components/Hero";
  // import Footer from "../components/Footer";
  // import Category from "../components/Catogery";
  // import ProductCard from "../components/ProductCard";
  // import ThirdSection from '../components/ThirdHomeSection';
  // import CategoriesSection from "../components/CategoriesSection";


  // import "./Home.css";

  // const Home = () => {
  //   const [products, setProducts] = useState([]);

  //   const [selectedCategory, setSelectedCategory] =
  //     useState("");

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

  //   // FILTER PRODUCTS
  //   const filteredProducts = selectedCategory
  //     ? products.filter(
  //         (product) =>
  //           product.category?._id ===
  //           selectedCategory
  //       )
  //     : products;

  //   return (
  //     <>
  //       <Navbar />
  //         {/* <Hero1 /> */}
  //       <Hero />

  //       <Category
  //         selectedCategory={selectedCategory}
  //         setSelectedCategory={
  //           setSelectedCategory
  //         }
  //       />

  //       <section className="menu-section">
  //         <h2>Featured Menu</h2>

  //         <div className="products-grid">
  //           {filteredProducts.length > 0 ? (
  //             filteredProducts.map((product) => (
  //               <ProductCard
  //                 key={product._id}
  //                 product={product}
  //               />
  //             ))
  //           ) : (
  //             <h3>No Products Found</h3>
  //           )}
  //         </div>
  //       </section>
  //       <ThirdSection />  
  //       <CategoriesSection />

  //       {/* <Features /> */}

  //       <Footer />
  //     </>
  //   );
  // };

  // export default Home;
  import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Category from "../components/Catogery";
import ProductCard from "../components/ProductCard";
import ThirdSection from "../components/ThirdHomeSection";
import CategoriesSection from "../components/CategoriesSection";

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
      const response = await API.get("/products");

      console.log("Products API:", response.data);

      setProducts(response.data.products || []);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error
      );

      setProducts([]);
    }
  };

  // Category filtering
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category === selectedCategory
      )
    : products;

  return (
    <>
      <Navbar />

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

      <ThirdSection />

      <CategoriesSection />

      <Footer />
    </>
  );
};

export default Home;  