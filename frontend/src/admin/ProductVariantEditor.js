// import React from 'react';

// export default function ProductVariantEditor({ variants, setVariants }) {
//   const addVariant = () => setVariants([...variants, { name: '', price: 0, options: [] }]);

//   const updateVariant = (idx, key, value) => {
//     const upd = [...variants];
//     upd[idx][key] = value;
//     setVariants(upd);
//   };

//   const addOption = (vIdx) => {
//     const upd = [...variants];
//     upd[vIdx].options = [...(upd[vIdx].options || []), { key: '', value: '' }];
//     setVariants(upd);
//   };

//   const updateOption = (vIdx, oIdx, key, value) => {
//     const upd = [...variants];
//     upd[vIdx].options[oIdx][key] = value;
//     setVariants(upd);
//   };

//   return (
//     <div>
//       <h4>Variants</h4>
//       {variants.map((v, vIdx) => (
//         <div key={vIdx} style={{ border: '1px solid #ccc', marginBottom: 8, padding: 8 }}>
//           <input placeholder="Variant Name" value={v.name} onChange={e => updateVariant(vIdx, 'name', e.target.value)} />
//           <input placeholder="Price" type="number" value={v.price} onChange={e => updateVariant(vIdx, 'price', e.target.value)} />
//           <button onClick={() => addOption(vIdx)}>Add Option</button>
//           {v.options && v.options.map((o, oIdx) => (
//             <div key={oIdx}>
//               <input placeholder="Option Key" value={o.key} onChange={e => updateOption(vIdx, oIdx, 'key', e.target.value)} />
//               <input placeholder="Option Value" value={o.value} onChange={e => updateOption(vIdx, oIdx, 'value', e.target.value)} />
//             </div>
//           ))}
//         </div>
//       ))}
//       <button onClick={addVariant}>Add Variant</button>
//     </div>
//   );
// }






import React, { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import "./ProductVariantEditor.css";

const ProductVariantEditor = ({ variants, setVariants }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentVariant, setCurrentVariant] = useState({
    name: "",
    price: "",
    stock: "",
    options: []
  });
  const [currentOption, setCurrentOption] = useState({ key: "", value: "" });

  const handleAddVariant = () => {
    if (!currentVariant.name || !currentVariant.price) {
      alert("Please fill in variant name and price");
      return;
    }

    const newVariant = {
      name: currentVariant.name,
      price: Number(currentVariant.price),
      stock: Number(currentVariant.stock) || 0,
      options: currentVariant.options
    };

    if (editingIndex !== null) {
      const updated = [...variants];
      updated[editingIndex] = newVariant;
      setVariants(updated);
      setEditingIndex(null);
    } else {
      setVariants([...variants, newVariant]);
    }

    resetVariantForm();
  };

  const handleAddOption = () => {
    if (!currentOption.key || !currentOption.value) {
      alert("Please fill in option key and value");
      return;
    }

    setCurrentVariant(prev => ({
      ...prev,
      options: [...prev.options, { ...currentOption }]
    }));

    setCurrentOption({ key: "", value: "" });
  };

  const handleRemoveOption = (index) => {
    setCurrentVariant(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const handleEditVariant = (index) => {
    setCurrentVariant(variants[index]);
    setEditingIndex(index);
  };

  const handleRemoveVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const resetVariantForm = () => {
    setCurrentVariant({
      name: "",
      price: "",
      stock: "",
      options: []
    });
    setCurrentOption({ key: "", value: "" });
  };

  return (
    <div className="variant-editor">
      <h3>Product Variants (Sizes, Colors, Options)</h3>
      
      <div className="variant-form">
        <div className="form-section">
          <h4>{editingIndex !== null ? "Edit Variant" : "Add New Variant"}</h4>
          
          <div className="variant-inputs">
            <div className="input-group">
              <label>Variant Name (e.g., Small, Medium, Large)</label>
              <input
                type="text"
                placeholder="e.g., Small, Red, M-Size"
                value={currentVariant.name}
                onChange={(e) => setCurrentVariant({ ...currentVariant, name: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label>Price</label>
              <input
                type="number"
                placeholder="Enter price"
                value={currentVariant.price}
                onChange={(e) => setCurrentVariant({ ...currentVariant, price: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label>Stock Quantity</label>
              <input
                type="number"
                placeholder="Enter stock"
                value={currentVariant.stock}
                onChange={(e) => setCurrentVariant({ ...currentVariant, stock: e.target.value })}
              />
            </div>
          </div>

          <div className="options-section">
            <h5>Options for this Variant</h5>
            
            <div className="option-inputs">
              <div className="input-group">
                <label>Option Key (e.g., Size, Color, Material)</label>
                <input
                  type="text"
                  placeholder="e.g., Size"
                  value={currentOption.key}
                  onChange={(e) => setCurrentOption({ ...currentOption, key: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label>Option Value (e.g., M, Red, Cotton)</label>
                <input
                  type="text"
                  placeholder="e.g., Medium"
                  value={currentOption.value}
                  onChange={(e) => setCurrentOption({ ...currentOption, value: e.target.value })}
                />
              </div>

              <button
                type="button"
                className="btn-add-option"
                onClick={handleAddOption}
              >
                <Plus size={16} /> Add Option
              </button>
            </div>

            {currentVariant.options.length > 0 && (
              <div className="options-list">
                {currentVariant.options.map((opt, idx) => (
                  <div key={idx} className="option-tag">
                    <span>{opt.key}: {opt.value}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(idx)}
                      className="btn-remove"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="variant-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={resetVariantForm}
            >
              Clear
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={handleAddVariant}
            >
              {editingIndex !== null ? "Update Variant" : "Add Variant"}
            </button>
          </div>
        </div>

        {variants.length > 0 && (
          <div className="variants-list">
            <h4>Added Variants ({variants.length})</h4>
            {variants.map((variant, index) => (
              <div key={index} className="variant-item">
                <div className="variant-info">
                  <div className="variant-header">
                    <h5>{variant.name}</h5>
                    <span className="price">₹{variant.price}</span>
                    <span className="stock">Stock: {variant.stock}</span>
                  </div>

                  {variant.options.length > 0 && (
                    <div className="variant-options">
                      {variant.options.map((opt, idx) => (
                        <span key={idx} className="option-badge">
                          {opt.key}: {opt.value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="variant-item-actions">
                  <button
                    type="button"
                    className="icon-btn edit"
                    onClick={() => handleEditVariant(index)}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn delete"
                    onClick={() => handleRemoveVariant(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductVariantEditor;