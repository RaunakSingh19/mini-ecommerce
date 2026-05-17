import { useState } from "react";

import AddCategory from "./AddCategory";

import AddProduct from "./AddProduct";

import "./AdminDashboard.css";

const AdminDashboard = () => {

  const [activeTab, setActiveTab] =
    useState("categories");

  return (

    <div className="dashboard">

      <div className="dashboard-top">

        <h1>
          Admin Dashboard
        </h1>

        <div className="dashboard-tabs">

          <button
            className={
              activeTab ===
              "categories"
                ? "active-tab"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "categories"
              )
            }
          >
            Categories
          </button>

          <button
            className={
              activeTab ===
              "products"
                ? "active-tab"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "products"
              )
            }
          >
            Products
          </button>

        </div>

      </div>



      <div className="dashboard-content">

        {activeTab ===
          "categories" && (
          <AddCategory />
        )}

        {activeTab ===
          "products" && (
          <AddProduct />
        )}

      </div>

    </div>
  );
};

export default AdminDashboard;  