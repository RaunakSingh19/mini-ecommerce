import { useEffect, useState } from "react";
import API from "../services/api";
import "./Category.css";

const Category = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await API.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="category-section">
      <h2>Food Categories</h2>

      <div className="category-grid">

        {/* ALL CATEGORY */}
        <div
          className={`category-card ${
            selectedCategory === ""
              ? "active-category"
              : ""
          }`}
          onClick={() => setSelectedCategory("")}
        >
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="All"
          />

          <h3>All</h3>
        </div>

        {categories.map((category) => (
          <div
            className={`category-card ${
              selectedCategory === category._id
                ? "active-category"
                : ""
            }`}
            key={category._id}
            onClick={() =>
              setSelectedCategory(category._id)
            }
          >
            <img
              src={category.image}
              alt={category.name}
            />

            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;