// import { useEffect, useState } from "react";

// import API from "../services/api";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import ProductCard from "../components/ProductCard";

// import "./Menu.css";

// const Menu = () => {
//   const [products, setProducts] = useState([]);

//   const [categories, setCategories] =
//     useState([]);

//   const [filteredProducts, setFilteredProducts] =
//     useState([]);

//   // FILTER STATES
//   const [search, setSearch] = useState("");

//   const [selectedCategory, setSelectedCategory] =
//     useState("");

//   const [priceSort, setPriceSort] =
//     useState("");

//   const [nameSort, setNameSort] =
//     useState("");

//   const [stockFilter, setStockFilter] =
//     useState("");

//   useEffect(() => {
//     fetchProducts();

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     // handleFilters();
//   }, [
//     products,
//     search,
//     selectedCategory,
//     priceSort,
//     nameSort,
//     stockFilter,
//   ]);

//   const fetchProducts = async () => {
//     try {
//       const { data } =
//         await API.get("/products");

//       setProducts(data);

//       setFilteredProducts(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const { data } =
//         await API.get("/categories");

//       setCategories(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="menu-page">

//         <div className="menu-top">

//           <h1>Our Menu</h1>

//           {/* SEARCH */}
//           <input
//             type="text"
//             placeholder="Search food..."
//             value={search}
//             onChange={(e) =>
//               setSearch(e.target.value)
//             }
//           />

//         </div>

//         {/* FILTERS */}
//         <div className="filters-container">

//           {/* CATEGORY */}
//           <select
//             value={selectedCategory}
//             onChange={(e) =>
//               setSelectedCategory(
//                 e.target.value
//               )
//             }
//           >
//             <option value="">
//               All Categories
//             </option>

//             {categories.map((category) => (
//               <option
//                 key={category._id}
//                 value={category._id}
//               >
//                 {category.name}
//               </option>
//             ))}
//           </select>

//           {/* PRICE */}
//           <select
//             value={priceSort}
//             onChange={(e) =>
//               setPriceSort(e.target.value)
//             }
//           >
//             <option value="">
//               Sort By Price
//             </option>

//             <option value="lowToHigh">
//               Low to High
//             </option>

//             <option value="highToLow">
//               High to Low
//             </option>
//           </select>

//           {/* NAME */}
//           <select
//             value={nameSort}
//             onChange={(e) =>
//               setNameSort(e.target.value)
//             }
//           >
//             <option value="">
//               Sort By Name
//             </option>

//             <option value="aToZ">
//               A - Z
//             </option>

//             <option value="zToA">
//               Z - A
//             </option>
//           </select>

//           {/* STOCK */}
//           <select
//             value={stockFilter}
//             onChange={(e) =>
//               setStockFilter(e.target.value)
//             }
//           >
//             <option value="">
//               Availability
//             </option>

//             <option value="inStock">
//               In Stock
//             </option>
//           </select>

//         </div>

//         {/* PRODUCTS */}
//         <div className="products-grid">

//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <ProductCard
//                 key={product._id}
//                 product={product}
//               />
//             ))
//           ) : (
//             <h2>No Products Found</h2>
//           )}

//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Menu;





import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import "./Menu.css";

const Menu = () => {
const [products, setProducts] = useState([]);
const [categories, setCategories] = useState([]);

const [search, setSearch] = useState("");
const [selectedCategory, setSelectedCategory] =
useState("");

const [sort, setSort] = useState("");

const [loading, setLoading] =
useState(true);

useEffect(() => {
fetchProducts();
fetchCategories();
}, []);

const fetchProducts = async () => {
try {
const response =
// await API.get("/products");
await API.get("/products?all=true");


  const productData =
    response.data.products ||
    response.data;

  setProducts(productData);
} catch (error) {
  console.log(error);
} finally {
  setLoading(false);
}

};

const fetchCategories = async () => {
try {
const response =
await API.get("/categories");
  

  setCategories(
    response.data.categories ||
    response.data
  );
} catch (error) {
  console.log(error);
}


};

let filteredProducts = [...products];

// SEARCH

if (search) {
filteredProducts =
filteredProducts.filter((product) =>
product.name
?.toLowerCase()
.includes(
search.toLowerCase()
)
);
}

// CATEGORY

if (selectedCategory) {
filteredProducts =
filteredProducts.filter(
(product) =>
product.category ===
selectedCategory
);
}

// SORT

if (sort === "low") {
filteredProducts.sort(
(a, b) =>
a.variants?.[0]?.price -
b.variants?.[0]?.price
);
}

if (sort === "high") {
filteredProducts.sort(
(a, b) =>
b.variants?.[0]?.price -
a.variants?.[0]?.price
);
}

if (sort === "az") {
filteredProducts.sort((a, b) =>
a.name.localeCompare(b.name)
);
}

if (sort === "za") {
filteredProducts.sort((a, b) =>
b.name.localeCompare(a.name)
);
}

return (
<> <Navbar />


  <section className="menu-hero">
    <div className="menu-overlay"></div>

    <div className="menu-content">
      <span>OUR MENU</span>

      <h1>
        Crafted With Passion.
        <br />
        Served With Soul.
      </h1>
    </div>
  </section>

  <section className="menu-page">

    <div className="menu-filters">

      <input
        type="text"
        placeholder="Search dishes..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

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

        {categories.map(
          (category) => (
            <option
              key={
                category._id
              }
              value={
                category.name
              }
            >
              {category.name}
            </option>
          )
        )}
      </select>

      <select
        value={sort}
        onChange={(e) =>
          setSort(
            e.target.value
          )
        }
      >
        <option value="">
          Sort
        </option>

        <option value="low">
          Price Low
        </option>

        <option value="high">
          Price High
        </option>

        <option value="az">
          A-Z
        </option>

        <option value="za">
          Z-A
        </option>
      </select>

    </div>

    {loading ? (
      <h2 className="menu-loading">
        Loading...
      </h2>
    ) : (
      <div className="products-grid">
        {filteredProducts.length >
        0 ? (
          filteredProducts.map(
            (product) => (
              <ProductCard
                key={
                  product._id
                }
                product={
                  product
                }
              />
            )
          )
        ) : (
          <h2 className="menu-empty">
            No Products Found
          </h2>
        )}
      </div>
    )}
  </section>

  <Footer />
</>


);
};

export default Menu;
