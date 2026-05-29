import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import "./Menu.css";

const Menu = () => {
  const [products, setProducts] = useState([]);

  const [categories, setCategories] =
    useState([]);

  const [filteredProducts, setFilteredProducts] =
    useState([]);

  // FILTER STATES
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [priceSort, setPriceSort] =
    useState("");

  const [nameSort, setNameSort] =
    useState("");

  const [stockFilter, setStockFilter] =
    useState("");

  useEffect(() => {
    fetchProducts();

    fetchCategories();
  }, []);

  useEffect(() => {
    // handleFilters();
  }, [
    products,
    search,
    selectedCategory,
    priceSort,
    nameSort,
    stockFilter,
  ]);

  const fetchProducts = async () => {
    try {
      const { data } =
        await API.get("/products");

      setProducts(data);

      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } =
        await API.get("/categories");

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  // FILTER LOGIC
  // const handleFilters = () => {
  //   let updatedProducts = [...products];

  //   // SEARCH
  //   if (search) {
  //     updatedProducts =
  //       updatedProducts.filter((product) =>
  //         product.title
  //           .toLowerCase()
  //           .includes(search.toLowerCase())
  //       );
  //   }

  //   // CATEGORY
  //   if (selectedCategory) {  
  //     updatedProducts =
  //       updatedProducts.filter(
  //         (product) =>
  //           product.category?._id ===
  //           selectedCategory
  //       );
  //   }

  //   // STOCK
  //   if (stockFilter === "inStock") {
  //     updatedProducts =
  //       updatedProducts.filter(
  //         (product) => product.stock > 0
  //       );
  //   }

  //   // PRICE SORT
  //   if (priceSort === "lowToHigh") {
  //     updatedProducts.sort(
  //       (a, b) => a.price - b.price
  //     );
  //   }

  //   if (priceSort === "highToLow") {
  //     updatedProducts.sort(
  //       (a, b) => b.price - a.price
  //     );
  //   }

  //   // NAME SORT
  //   if (nameSort === "aToZ") {
  //     updatedProducts.sort((a, b) =>
  //       a.title.localeCompare(b.title)
  //     );
  //   }

  //   if (nameSort === "zToA") {
  //     updatedProducts.sort((a, b) =>
  //       b.title.localeCompare(a.title)
  //     );
  //   }

  //   setFilteredProducts(updatedProducts);
  // };

  return (
    <>
      <Navbar />

      <div className="menu-page">

        <div className="menu-top">

          <h1>Our Menu</h1>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* FILTERS */}
        <div className="filters-container">

          {/* CATEGORY */}
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
          >
            <option value="">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
          </select>

          {/* PRICE */}
          <select
            value={priceSort}
            onChange={(e) =>
              setPriceSort(e.target.value)
            }
          >
            <option value="">
              Sort By Price
            </option>

            <option value="lowToHigh">
              Low to High
            </option>

            <option value="highToLow">
              High to Low
            </option>
          </select>

          {/* NAME */}
          <select
            value={nameSort}
            onChange={(e) =>
              setNameSort(e.target.value)
            }
          >
            <option value="">
              Sort By Name
            </option>

            <option value="aToZ">
              A - Z
            </option>

            <option value="zToA">
              Z - A
            </option>
          </select>

          {/* STOCK */}
          <select
            value={stockFilter}
            onChange={(e) =>
              setStockFilter(e.target.value)
            }
          >
            <option value="">
              Availability
            </option>

            <option value="inStock">
              In Stock
            </option>
          </select>

        </div>

        {/* PRODUCTS */}
        <div className="products-grid">

          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))
          ) : (
            <h2>No Products Found</h2>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Menu;