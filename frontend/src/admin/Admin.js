import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="admin-section">
        <AddCategory />
      </div>
      <div className="admin-section">
        <AddProduct />
      </div>
    </div>
  );
};

export default Admin;