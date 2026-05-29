// import { useEffect, useState, useCallback } from "react";
// import API from "../services/api";
// import { Search, Edit3, Trash2, Plus, X, Filter } from "lucide-react";
// import ProductVariantEditor from "./ProductVariantEditor";

// const AddProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [images, setImages] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [priceSort, setPriceSort] = useState("");
  
//   // NEW: Product variants and availability
//   const [variants, setVariants] = useState([]);
//   const [isActive, setIsActive] = useState(true); // product available toggle

//   const [formData, setFormData] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     shortDescription: "",
//     price: "", // Not needed, but can use lowest price
//     category: ""
//   });

//   // FETCH PRODUCTS
//   const fetchProducts = useCallback(async () => {
//     try {
//       const { data } = await API.get("/products");
//       setProducts(data);
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);
//   // FETCH CATEGORIES
//   const fetchCategories = useCallback(async () => {
//     try {
//       const { data } = await API.get("/categories");
//       setCategories(data);
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);
//   useEffect(() => { fetchProducts(); fetchCategories(); }, [fetchProducts, fetchCategories]);

//   // FILTER PRODUCTS (remove stock filter/badge everywhere)
//   useEffect(() => {
//     let results = [...products];
//     if (searchTerm) {
//       results = results.filter(product =>
//         product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.slug.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (categoryFilter) {
//       results = results.filter(product => product.category?._id === categoryFilter);
//     }
//     if (priceSort === "asc") results.sort((a, b) => a.price - b.price);
//     if (priceSort === "desc") results.sort((a, b) => b.price - a.price);
//     setFilteredProducts(results);
//   }, [searchTerm, categoryFilter, priceSort, products]);
  
//   // HANDLE TEXT INPUT
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   // HANDLE IMAGE INPUT
//   const handleImageChange = (e) => setImages([...e.target.files]);
  
//   // SUBMIT FORM
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const productData = new FormData();
//       productData.append("title", formData.title);
//       productData.append("slug", formData.slug);
//       productData.append("description", formData.description);
//       productData.append("shortDescription", formData.shortDescription);
//       productData.append("category", formData.category);
//       productData.append("variants", JSON.stringify(variants)); // send as JSON
//       productData.append("isActive", isActive);
//       images.forEach((img) => productData.append("images", img));
//       if (editingId) {
//         await API.put(`/products/${editingId}`, productData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Product Updated Successfully");
//       } else {
//         await API.post("/products", productData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Product Added Successfully");
//       }
//       resetForm();
//       fetchProducts();
//     } catch (error) {
//       console.error(error);
//       alert("Error saving product");
//     } finally {
//       setLoading(false);
//     }
//   };
//   // DELETE PRODUCT
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this product?")) return;
//     try {
//       await API.delete(`/products/${id}`);
//       fetchProducts();
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   // EDIT PRODUCT
//   const handleEdit = (product) => {
//     setEditingId(product._id);
//     setFormData({
//       title: product.title,
//       slug: product.slug,
//       description: product.description,
//       shortDescription: product.shortDescription,
//       price: product.price,
//       category: product.category?._id || "",
//     });
//     setVariants(product.variants ?? []);
//     setIsActive(product.isActive !== undefined ? product.isActive : true);
//     setIsFormOpen(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
//   // RESET FORM
//   const resetForm = () => {
//     setFormData({
//       title: "",
//       slug: "",
//       description: "",
//       shortDescription: "",
//       price: "",
//       category: "",
//     });
//     setImages([]);
//     setEditingId(null);
//     setVariants([]);
//     setIsActive(true);
//     setIsFormOpen(false);
//   };
//   // CLEAR FILTERS
//   const clearFilters = () => {
//     setSearchTerm("");
//     setCategoryFilter("");
//     setPriceSort("");
//   };
//   return (
//     <div className="admin-module">
//       {/* HEADER */}
//       <div className="module-header">
//         <div>
//           <h2>Products</h2>
//           <p>Manage your products</p>
//         </div>
//         <button className="btn-primary" onClick={() => { resetForm(); setIsFormOpen(!isFormOpen); }}>
//           {isFormOpen ? <X size={18}/> : <Plus size={18}/>} {isFormOpen ? "Close" : "Add Product"}
//         </button>
//       </div>
//       {/* FILTER BAR */}
//       <div className="filter-bar">
//         {/* SEARCH */}
//         <div className="search-bar">
//           <Search size={18} />
//           <input type="text" placeholder="Search products..." value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)} />
//         </div>
//         {/* FILTERS */}
//         <div className="filter-controls">
//           <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
//             <option value="">All Categories</option>
//             {categories.map(cat => (
//               <option key={cat._id} value={cat._id}>{cat.name}</option>
//             ))}
//           </select>
//           <select value={priceSort} onChange={e => setPriceSort(e.target.value)}>
//             <option value="">Sort By Price</option>
//             <option value="asc">Low To High</option>
//             <option value="desc">High To Low</option>
//           </select>
//           {(searchTerm || categoryFilter || priceSort) && (
//             <button className="btn-text" onClick={clearFilters}>Clear</button>
//           )}
//         </div>
//       </div>
//       {/* FORM */}
//       {isFormOpen && (
//         <form className="admin-form" onSubmit={handleSubmit}>
//           <div className="form-grid">
//             <div className="input-group">
//               <label>Title</label>
//               <input type="text" name="title" value={formData.title} onChange={handleChange} required />
//             </div>
//             <div className="input-group">
//               <label>Slug</label>
//               <input type="text" name="slug" value={formData.slug} onChange={handleChange} required />
//             </div>
//             <div className="input-group full-width">
//               <label>Description</label>
//               <textarea rows="4" name="description" value={formData.description} onChange={handleChange} />
//             </div>
//             <div className="input-group">
//               <label>Short Description</label>
//               <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} />
//             </div>
//             <div className="input-group">
//               <label>Category</label>
//               <select name="category" value={formData.category} onChange={handleChange}>
//                 <option value="">Select Category</option>
//                 {categories.map(cat => (
//                   <option key={cat._id} value={cat._id}>{cat.name}</option>
//                 ))}
//               </select>
//             </div>
//             {/* IMAGE INPUT */}
//             <div className="input-group">
//               <label>Product Images</label>
//               <input type="file" multiple onChange={handleImageChange} />
//             </div>
//             {/* ACTIVE TOGGLE */}
//             <div className="input-group">
//               <label>Available (ON/OFF)</label>
//               <input type="checkbox"
//                 checked={isActive}
//                 onChange={e => setIsActive(e.target.checked)}
//                 style={{ width: 24, height: 24 }}
//               />
//             </div>
//           </div>
//           {/* Product Variant Editor */}
//           <ProductVariantEditor variants={variants} setVariants={setVariants} />
//           {/* ACTIONS */}
//           <div className="form-actions">
//             <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>
//             <button type="submit" className="btn-primary" disabled={loading}>
//               {loading
//                 ? "Saving..."
//                 : editingId
//                 ? "Update Product"
//                 : "Add Product"}
//             </button>
//           </div>
//         </form>
//       )}
//       {/* PRODUCTS */}
//       {filteredProducts.length > 0 ? (
//         <div className="admin-list">
//           {filteredProducts.map(product => (
//             <div className="admin-card" key={product._id}>
//               <div className="card-image">
//                 <img src={product.images?.[0]} alt={product.title} />
//                 <span className="stock-badge">
//                   {/* REMOVE STOCK BADGES */}
//                   {product.isActive ? "Available" : "Not Available"}
//                 </span>
//               </div>
//               <div className="card-body">
//                 <h3>{product.title}</h3>
//                 <span className="category-tag">{product.category?.name}</span>
//                 <p className="price">
//                   ₹{" "}
//                   {Array.isArray(product.variants) && product.variants.length
//                     ? Math.min(...product.variants.map(v => Number(v.price)))
//                     : product.price}
//                 </p>
//                 <div className="admin-actions">
//                   <button className="icon-btn edit" onClick={() => handleEdit(product)}>
//                     <Edit3 size={16} /> Edit
//                   </button>
//                   <button className="icon-btn delete" onClick={() => handleDelete(product._id)}>
//                     <Trash2 size={16} /> Delete
//                   </button>
//                 </div>
//                 {/* Admin inline toggle */}
//                 <div style={{ marginTop: 6 }}>
//                   <label>
//                     <input
//                       type="checkbox"
//                       checked={product.isActive}
//                       onChange={() => {
//                         API.patch(`/products/${product._id}/active`, { isActive: !product.isActive })
//                           .then(fetchProducts);
//                       }}
//                       style={{ width: 17, height: 17 }}
//                     />
//                     <span style={{ marginLeft: 8 }}>
//                       {product.isActive ? "Active" : "Inactive"}
//                     </span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="empty-state">
//           <Filter size={40} />
//           <p>No Products Found</p>
//           <button className="btn-secondary" onClick={clearFilters}>Reset Filters</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddProduct;




// import { useEffect, useState, useCallback } from "react";
// import API from "../services/api";
// import { Search, Edit3, Trash2, Plus, X, Filter, Eye, EyeOff } from "lucide-react";
// import ProductVariantEditor from "./ProductVariantEditor";
// import "./AddProduct.css";

// const AddProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [images, setImages] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [priceSort, setPriceSort] = useState("");
//   const [variants, setVariants] = useState([]);
//   const [isActive, setIsActive] = useState(true);
//   const [togglingId, setTogglingId] = useState(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     shortDescription: "",
//     category: ""
//   });

//   // FETCH PRODUCTS
//   const fetchProducts = useCallback(async () => {
//     try {
//       const { data } = await API.get("/products");
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   }, []);

//   // FETCH CATEGORIES
//   const fetchCategories = useCallback(async () => {
//     try {
//       const { data } = await API.get("/categories");
//       setCategories(data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, [fetchProducts, fetchCategories]);

//   // FILTER PRODUCTS
//   useEffect(() => {
//     let results = [...products];

//     if (searchTerm) {
//       results = results.filter(product =>
//         product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.slug.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (categoryFilter) {
//       results = results.filter(product => product.category?._id === categoryFilter);
//     }

//     if (priceSort === "asc") {
//       results.sort((a, b) => {
//         const priceA = a.variants?.[0]?.price || 0;
//         const priceB = b.variants?.[0]?.price || 0;
//         return priceA - priceB;
//       });
//     }

//     if (priceSort === "desc") {
//       results.sort((a, b) => {
//         const priceA = a.variants?.[0]?.price || 0;
//         const priceB = b.variants?.[0]?.price || 0;
//         return priceB - priceA;
//       });
//     }

//     setFilteredProducts(results);
//   }, [searchTerm, categoryFilter, priceSort, products]);

//   // HANDLE TEXT INPUT
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // HANDLE IMAGE INPUT
//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   // SUBMIT FORM
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const productData = new FormData();
//       productData.append("title", formData.title);
//       productData.append("slug", formData.slug);
//       productData.append("description", formData.description);
//       productData.append("shortDescription", formData.shortDescription);
//       productData.append("category", formData.category);
//       productData.append("variants", JSON.stringify(variants));
//       productData.append("isActive", isActive);

//       images.forEach((img) => productData.append("images", img));

//       if (editingId) {
//         await API.put(`/products/${editingId}`, productData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Product Updated Successfully");
//       } else {
//         await API.post("/products", productData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Product Added Successfully");
//       }

//       resetForm();
//       fetchProducts();
//     } catch (error) {
//       console.error("Error saving product:", error);
//       alert("Error saving product: " + (error.response?.data?.message || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // DELETE PRODUCT
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this product?")) return;

//     try {
//       await API.delete(`/products/${id}`);
//       fetchProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Error deleting product");
//     }
//   };

//   // TOGGLE PRODUCT AVAILABILITY
//   const handleToggleAvailability = async (id, currentStatus) => {
//     setTogglingId(id);

//     try {
//       await API.patch(`/products/${id}/toggle-availability`, {
//         isActive: !currentStatus
//       });
//       fetchProducts();
//     } catch (error) {
//       console.error("Error toggling availability:", error);
//       alert("Error toggling availability");
//     } finally {
//       setTogglingId(null);
//     }
//   };

//   // EDIT PRODUCT
//   const handleEdit = (product) => {
//     setEditingId(product._id);
//     setFormData({
//       title: product.title,
//       slug: product.slug,
//       description: product.description,
//       shortDescription: product.shortDescription,
//       category: product.category?._id || "",
//     });
//     setVariants(product.variants || []);
//     setIsActive(product.isActive !== undefined ? product.isActive : true);
//     setIsFormOpen(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // RESET FORM
//   const resetForm = () => {
//     setFormData({
//       title: "",
//       slug: "",
//       description: "",
//       shortDescription: "",
//       category: "",
//     });
//     setImages([]);
//     setEditingId(null);
//     setVariants([]);
//     setIsActive(true);
//     setIsFormOpen(false);
//   };

//   // CLEAR FILTERS
//   const clearFilters = () => {
//     setSearchTerm("");
//     setCategoryFilter("");
//     setPriceSort("");
//   };

//   const getMinPrice = (product) => {
//     if (product.variants && product.variants.length > 0) {
//       return Math.min(...product.variants.map(v => Number(v.price)));
//     }
//     return "N/A";
//   };

//   return (
//     <div className="admin-module">
//       {/* HEADER */}
//       <div className="module-header">
//         <div>
//           <h2>Products</h2>
//           <p>Manage your products</p>
//         </div>
//         <button
//           className="btn-primary"
//           onClick={() => {
//             resetForm();
//             setIsFormOpen(!isFormOpen);
//           }}
//         >
//           {isFormOpen ? <X size={18} /> : <Plus size={18} />}
//           {isFormOpen ? "Close" : "Add Product"}
//         </button>
//       </div>

//       {/* FILTER BAR */}
//       <div className="filter-bar">
//         <div className="search-bar">
//           <Search size={18} />
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="filter-controls">
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={priceSort}
//             onChange={(e) => setPriceSort(e.target.value)}
//           >
//             <option value="">Sort By Price</option>
//             <option value="asc">Low To High</option>
//             <option value="desc">High To Low</option>
//           </select>

//           {(searchTerm || categoryFilter || priceSort) && (
//             <button className="btn-text" onClick={clearFilters}>
//               Clear
//             </button>
//           )}
//         </div>
//       </div>

//       {/* FORM */}
//       {isFormOpen && (
//         <form className="admin-form" onSubmit={handleSubmit}>
//           <div className="form-grid">
//             <div className="input-group">
//               <label>Title *</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Slug *</label>
//               <input
//                 type="text"
//                 name="slug"
//                 value={formData.slug}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="input-group full-width">
//               <label>Description</label>
//               <textarea
//                 rows="4"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="input-group">
//               <label>Short Description</label>
//               <input
//                 type="text"
//                 name="shortDescription"
//                 value={formData.shortDescription}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="input-group">
//               <label>Category *</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat._id} value={cat._id}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="input-group">
//               <label>Product Images (Multiple) *</label>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 required={!editingId}
//               />
//               {images.length > 0 && (
//                 <p className="file-info">{images.length} image(s) selected</p>
//               )}
//             </div>

//             <div className="input-group">
//               <label>Available (ON/OFF)</label>
//               <label className="checkbox-label">
//                 <input
//                   type="checkbox"
//                   checked={isActive}
//                   onChange={(e) => setIsActive(e.target.checked)}
//                 />
//                 <span>{isActive ? "Product Available" : "Product Unavailable"}</span>
//               </label>
//             </div>
//           </div>

//           {/* PRODUCT VARIANT EDITOR */}
//           <ProductVariantEditor variants={variants} setVariants={setVariants} />

//           {/* FORM ACTIONS */}
//           <div className="form-actions">
//             <button
//               type="button"
//               className="btn-secondary"
//               onClick={resetForm}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn-primary"
//               disabled={loading}
//             >
//               {loading
//                 ? "Saving..."
//                 : editingId
//                   ? "Update Product"
//                   : "Add Product"}
//             </button>
//           </div>
//         </form>
//       )}

//       {/* PRODUCTS LIST */}
//       {filteredProducts.length > 0 ? (
//         <div className="admin-list">
//           {filteredProducts.map((product) => (
//             <div
//               key={product._id}
//               className={`admin-card ${!product.isActive ? "unavailable" : ""}`}
//             >
//               <div className="card-image">
//                 <img
//                   src={product.images?.[0] || "/placeholder.png"}
//                   alt={product.title}
//                 />

//                 {/* AVAILABILITY BADGE */}
//                 <span
//                   className={`availability-badge ${
//                     product.isActive ? "active" : "inactive"
//                   }`}
//                 >
//                   {product.isActive ? "Available" : "Unavailable"}
//                 </span>

//                 {/* UNAVAILABLE OVERLAY */}
//                 {!product.isActive && (
//                   <div className="unavailable-overlay">
//                     <div className="out-of-stock-tape">OUT OF STOCK</div>
//                   </div>
//                 )}
//               </div>

//               <div className="card-body">
//                 <h3 style={{ opacity: product.isActive ? 1 : 0.6 }}>
//                   {product.title}
//                 </h3>
//                 <span className="category-tag">{product.category?.name}</span>

//                 <p className="price">
//                   ₹{getMinPrice(product)}
//                   {product.variants?.length > 1 && " (Starting)"}
//                 </p>

//                 {product.variants?.length > 0 && (
//                   <div className="variants-preview">
//                     <strong>Options:</strong>
//                     {product.variants.map((v, idx) => (
//                       <span key={idx} className="variant-badge">
//                         {v.name}
//                       </span>
//                     ))}
//                   </div>
//                 )}

//                 {/* ACTIONS */}
//                 <div className="admin-actions">
//                   <button
//                     className="icon-btn edit"
//                     onClick={() => handleEdit(product)}
//                   >
//                     <Edit3 size={16} /> Edit
//                   </button>
//                   <button
//                     className="icon-btn delete"
//                     onClick={() => handleDelete(product._id)}
//                   >
//                     <Trash2 size={16} /> Delete
//                   </button>
//                 </div>

//                 {/* AVAILABILITY TOGGLE */}
//                 <div className="availability-toggle">
//                   <button
//                     className={`toggle-btn ${
//                       product.isActive ? "active" : "inactive"
//                     }`}
//                     onClick={() =>
//                       handleToggleAvailability(product._id, product.isActive)
//                     }
//                     disabled={togglingId === product._id}
//                   >
//                     {togglingId === product._id ? (
//                       <span>Updating...</span>
//                     ) : (
//                       <>
//                         {product.isActive ? (
//                           <Eye size={16} />
//                         ) : (
//                           <EyeOff size={16} />
//                         )}
//                         <span>
//                           {product.isActive ? "Active" : "Inactive"}
//                         </span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="empty-state">
//           <Filter size={40} />
//           <p>No Products Found</p>
//           <button className="btn-secondary" onClick={clearFilters}>
//             Reset Filters
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddProduct;




import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import { Search, Edit3, Trash2, Plus, X, Filter, Eye, EyeOff } from "lucide-react";
import ProductVariantEditor from "./ProductVariantEditor";
import "./AddProduct.css";

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [variants, setVariants] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    category: ""
  });

  // FETCH PRODUCTS
  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  // FETCH CATEGORIES
  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await API.get("/categories");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // FILTER PRODUCTS
  useEffect(() => {
    let results = [...products];

    if (searchTerm) {
      results = results.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      results = results.filter(product => product.category?._id === categoryFilter);
    }

    if (priceSort === "asc") {
      results.sort((a, b) => {
        const priceA = getMinPrice(a);
        const priceB = getMinPrice(b);
        return (typeof priceA === "number" ? priceA : 0) - (typeof priceB === "number" ? priceB : 0);
      });
    }

    if (priceSort === "desc") {
      results.sort((a, b) => {
        const priceA = getMinPrice(a);
        const priceB = getMinPrice(b);
        return (typeof priceB === "number" ? priceB : 0) - (typeof priceA === "number" ? priceA : 0);
      });
    }

    setFilteredProducts(results);
  }, [searchTerm, categoryFilter, priceSort, products]);

  // HANDLE TEXT INPUT
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // HANDLE IMAGE INPUT
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!variants || variants.length === 0) {
      alert("Please add at least one variant with price");
      return;
    }

    setLoading(true);

    try {
      const productData = new FormData();
      productData.append("title", formData.title);
      productData.append("slug", formData.slug);
      productData.append("description", formData.description);
      productData.append("shortDescription", formData.shortDescription);
      productData.append("category", formData.category);
      
      // Ensure variants are properly formatted with numeric prices
      const formattedVariants = variants.map(v => ({
        name: v.name,
        price: Number(v.price),
        stock: Number(v.stock) || 0,
        options: v.options || []
      }));
      
      productData.append("variants", JSON.stringify(formattedVariants));
      productData.append("isActive", isActive);

      images.forEach((img) => productData.append("images", img));

      if (editingId) {
        await API.put(`/products/${editingId}`, productData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product Updated Successfully");
      } else {
        await API.post("/products", productData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product Added Successfully");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  // TOGGLE PRODUCT AVAILABILITY
  const handleToggleAvailability = async (id, currentStatus) => {
    setTogglingId(id);

    try {
      await API.patch(`/products/${id}/toggle-availability`, {
        isActive: !currentStatus
      });
      fetchProducts();
    } catch (error) {
      console.error("Error toggling availability:", error);
      alert("Error toggling availability");
    } finally {
      setTogglingId(null);
    }
  };

  // EDIT PRODUCT
  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      title: product.title,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      category: product.category?._id || "",
    });
    setVariants(product.variants || []);
    setIsActive(product.isActive !== undefined ? product.isActive : true);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // RESET FORM
  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      shortDescription: "",
      category: "",
    });
    setImages([]);
    setEditingId(null);
    setVariants([]);
    setIsActive(true);
    setIsFormOpen(false);
  };

  // CLEAR FILTERS
  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setPriceSort("");
  };

  // GET MINIMUM PRICE FROM VARIANTS
  const getMinPrice = (product) => {
    if (!product.variants || !Array.isArray(product.variants) || product.variants.length === 0) {
      return "N/A";
    }
    
    try {
      const prices = product.variants
        .map(v => {
          const price = Number(v.price);
          return isNaN(price) ? null : price;
        })
        .filter(price => price !== null);
      
      if (prices.length === 0) {
        return "N/A";
      }
      
      return Math.min(...prices);
    } catch (error) {
      console.error("Error calculating min price:", error);
      return "N/A";
    }
  };

  return (
    <div className="admin-module">
      {/* HEADER */}
      <div className="module-header">
        <div>
          <h2>Products</h2>
          <p>Manage your products</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            resetForm();
            setIsFormOpen(!isFormOpen);
          }}
        >
          {isFormOpen ? <X size={18} /> : <Plus size={18} />}
          {isFormOpen ? "Close" : "Add Product"}
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
          >
            <option value="">Sort By Price</option>
            <option value="asc">Low To High</option>
            <option value="desc">High To Low</option>
          </select>

          {(searchTerm || categoryFilter || priceSort) && (
            <button className="btn-text" onClick={clearFilters}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* FORM */}
      {isFormOpen && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group full-width">
              <label>Description</label>
              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Short Description</label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Product Images (Multiple) *</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required={!editingId}
              />
              {images.length > 0 && (
                <p className="file-info">{images.length} image(s) selected</p>
              )}
            </div>

            <div className="input-group">
              <label>Available (ON/OFF)</label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <span>{isActive ? "Product Available" : "Product Unavailable"}</span>
              </label>
            </div>
          </div>

          {/* PRODUCT VARIANT EDITOR */}
          <ProductVariantEditor variants={variants} setVariants={setVariants} />

          {/* FORM ACTIONS */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingId
                  ? "Update Product"
                  : "Add Product"}
            </button>
          </div>
        </form>
      )}

      {/* PRODUCTS LIST */}
      {filteredProducts.length > 0 ? (
        <div className="admin-list">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className={`admin-card ${!product.isActive ? "unavailable" : ""}`}
            >
              <div className="card-image">
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.title}
                />

                {/* AVAILABILITY BADGE */}
                <span
                  className={`availability-badge ${
                    product.isActive ? "active" : "inactive"
                  }`}
                >
                  {product.isActive ? "Available" : "Unavailable"}
                </span>

                {/* UNAVAILABLE OVERLAY */}
                {!product.isActive && (
                  <div className="unavailable-overlay">
                    <div className="out-of-stock-tape">OUT OF STOCK</div>
                  </div>
                )}
              </div>

              <div className="card-body">
                <h3 style={{ opacity: product.isActive ? 1 : 0.6 }}>
                  {product.title}
                </h3>
                <span className="category-tag">{product.category?.name}</span>

                <p className="price">
                  ₹{getMinPrice(product)}
                  {product.variants?.length > 1 && " (Starting)"}
                </p>

                {product.variants?.length > 0 && (
                  <div className="variants-preview">
                    <strong>Options:</strong>
                    {product.variants.map((v, idx) => (
                      <span key={idx} className="variant-badge">
                        {v.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* ACTIONS */}
                <div className="admin-actions">
                  <button
                    className="icon-btn edit"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit3 size={16} /> Edit
                  </button>
                  <button
                    className="icon-btn delete"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>

                {/* AVAILABILITY TOGGLE */}
                <div className="availability-toggle">
                  <button
                    className={`toggle-btn ${
                      product.isActive ? "active" : "inactive"
                    }`}
                    onClick={() =>
                      handleToggleAvailability(product._id, product.isActive)
                    }
                    disabled={togglingId === product._id}
                  >
                    {togglingId === product._id ? (
                      <span>Updating...</span>
                    ) : (
                      <>
                        {product.isActive ? (
                          <Eye size={16} />
                        ) : (
                          <EyeOff size={16} />
                        )}
                        <span>
                          {product.isActive ? "Active" : "Inactive"}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Filter size={40} />
          <p>No Products Found</p>
          <button className="btn-secondary" onClick={clearFilters}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
