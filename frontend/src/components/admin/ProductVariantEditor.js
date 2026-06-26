import { useState } from "react";
import {
  Plus,
  Trash2
} from "lucide-react";
import "./ProductVariantEditor.css";

const ProductVariantEditor = ({ variants, setVariants }) => {
  const [currentVariant, setCurrentVariant] = useState({
    name: "",
    price: "",
    sku: "",
  });

  const [errors, setErrors] = useState({});

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setCurrentVariant((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateVariant = () => {
    const newErrors = {};

    if (!currentVariant.name.trim()) {
      newErrors.name = "Variant name is required";
    }

    if (!currentVariant.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(currentVariant.price) || Number(currentVariant.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addVariant = () => {
    if (!validateVariant()) return;

    const newVariant = {
      name: currentVariant.name.trim(),
      price: Number(currentVariant.price),
      sku: currentVariant.sku.trim() || `SKU-${Date.now()}`,
    };

    setVariants([...variants, newVariant]);
    setCurrentVariant({
      name: "",
      price: "",
      sku: "",
    });
    setErrors({});
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  return (
    <div className="variant-editor">
      <div className="variant-editor-content">
        {/* Add New Variant Section */}
        <div className="variant-form">
          <h4 className="variant-form-title">Add Product Variant</h4>
          
          <div className="variant-inputs">
            <div className="variant-input-group">
              <label htmlFor="variant-name">Variant Name *</label>
              <input
                id="variant-name"
                type="text"
                name="name"
                placeholder="e.g., Small, Medium, Large, Red, Blue"
                value={currentVariant.name}
                onChange={handleVariantChange}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="variant-input-group">
              <label htmlFor="variant-price">Price (₹) *</label>
              <input
                id="variant-price"
                type="number"
                name="price"
                placeholder="e.g., 299"
                value={currentVariant.price}
                onChange={handleVariantChange}
                min="1"
                step="0.01"
                className={errors.price ? "input-error" : ""}
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>

            <div className="variant-input-group">
              <label htmlFor="variant-sku">SKU (Optional)</label>
              <input
                id="variant-sku"
                type="text"
                name="sku"
                placeholder="e.g., PROD-001-S"
                value={currentVariant.sku}
                onChange={handleVariantChange}
              />
            </div>

            <button
              type="button"
              className="btn-add-variant"
              onClick={addVariant}
            >
              <Plus size={18} />
              Add Variant
            </button>
          </div>
        </div>

        {/* Variants List */}
        {variants.length > 0 && (
          <div className="variants-list-container">
            <h4 className="variants-list-title">
              Added Variants ({variants.length})
            </h4>
            <div className="variants-list">
              {variants.map((variant, index) => (
                <div key={index} className="variant-item">
                  <div className="variant-item-content">
                    <div className="variant-item-header">
                      <h5 className="variant-item-name">{variant.name}</h5>
                      <span className="variant-item-price">₹{Number(variant.price).toLocaleString()}</span>
                    </div>
                    {variant.sku && (
                      <p className="variant-item-sku">SKU: {variant.sku}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn-remove-variant"
                    onClick={() => removeVariant(index)}
                    title="Remove variant"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {variants.length === 0 && (
          <div className="variant-empty-state">
            <p>No variants added yet. Add your first variant above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductVariantEditor;
