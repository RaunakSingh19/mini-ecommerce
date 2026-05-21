// AdminProductToggle.js
import axios from "axios";
export default function AdminProductToggle({ product, onUpdate }) {
  const handleToggle = async () => {
    await axios.patch(`/api/products/${product._id}/active`, { isActive: !product.isActive });
    onUpdate();
  };
  return (
    <button onClick={handleToggle}>
      {product.isActive ? "Available (ON)" : "Not Available (OFF)"}
    </button>
  );
}   