import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import {
  Search,
  Edit3,
  Trash2,
  Plus,
  X,
  Filter,
  Eye,
  EyeOff,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import ProductVariantEditor from "./ProductVariantEditor";
import "./AddProduct.css";

const AddProduct = () => {
  // ==================== STATE MANAGEMENT ====================
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [variants, setVariants] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isInStock, setIsInStock] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    shortDescription: "",
    description: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
  });

  // ==================== NOTIFICATIONS ====================
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // ==================== FETCH PRODUCTS ====================
  const fetchProducts = useCallback(async () => {
    try {
      setFetchLoading(true);
      const { data } = await API.get("/products?limit=100");
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      showNotification("Failed to fetch products", "error");
    } finally {
      setFetchLoading(false);
    }
  }, []);

  // ==================== FETCH CATEGORIES ====================
  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await API.get("/categories");
      setCategories(data.data || data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      showNotification("Failed to fetch categories", "error");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // ==================== FILTER & SORT ====================
  useEffect(() => {
    let results = [...products];

    if (searchTerm) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      results = results.filter((product) => product.category === categoryFilter);
    }

    if (priceSort === "asc") {
      results.sort((a, b) => getMinPrice(a) - getMinPrice(b));
    } else if (priceSort === "desc") {
      results.sort((a, b) => getMinPrice(b) - getMinPrice(a));
    }

    setFilteredProducts(results);
  }, [searchTerm, categoryFilter, priceSort, products]);

  // ==================== FORM HANDLERS ====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  // ==================== SUBMIT FORM ====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showNotification("Product name is required", "error");
      return;
    }

    if (!formData.category) {
      showNotification("Category is required", "error");
      return;
    }

    if (!variants || variants.length === 0) {
      showNotification("Please add at least one variant with price", "error");
      return;
    }

    if (!editingId && images.length === 0) {
      showNotification("Please upload at least one product image", "error");
      return;
    }

    setLoading(true);

    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("category", formData.category);
      productData.append("shortDescription", formData.shortDescription);
      productData.append("description", formData.description);
      productData.append("isActive", isActive);
      productData.append("isFeatured", isFeatured);
      productData.append("isInStock", isInStock);

      // Add tags if provided
      if (formData.tags) {
        const tagArray = formData.tags.split(",").map((tag) => tag.trim());
        productData.append("tags", JSON.stringify(tagArray));
      }

      // Add meta data
      if (formData.metaTitle) productData.append("metaTitle", formData.metaTitle);
      if (formData.metaDescription)
        productData.append("metaDescription", formData.metaDescription);

      // Format variants
      const formattedVariants = variants.map((v) => ({
        name: v.name,
        price: Number(v.price),
        sku: v.sku || "",
        stock: Number(v.stock) || 0,
      }));
      productData.append("variants", JSON.stringify(formattedVariants));

      // Add images
      images.forEach((img) => productData.append("images", img));

      if (editingId) {
        await API.put(`/products/${editingId}`, productData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showNotification("Product updated successfully!", "success");
      } else {
        await API.post("/products", productData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showNotification("Product created successfully!", "success");
      }

      resetForm();
      fetchProducts();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      const message =
        error.response?.data?.message || "Error saving product. Please try again.";
      showNotification(message, "error");
    } finally {
      setLoading(false);
    }
  };

  // ==================== DELETE PRODUCT ====================
  const handleDelete = async (id) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
      return;
    }

    try {
      await API.delete(`/products/${id}`);
      showNotification("Product deleted successfully", "success");
      fetchProducts();
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification("Error deleting product", "error");
    }
  };

  // ==================== TOGGLE AVAILABILITY ====================
  const handleToggleAvailability = async (id, currentStatus) => {
    setTogglingId(id);
    try {
      await API.patch(`/products/${id}/toggle-availability`);
      fetchProducts();
      showNotification(
        currentStatus ? "Product deactivated" : "Product activated",
        "success"
      );
    } catch (error) {
      console.error("Error toggling availability:", error);
      showNotification("Error toggling availability", "error");
    } finally {
      setTogglingId(null);
    }
  };

  // ==================== TOGGLE FEATURED ====================
  const handleToggleFeatured = async (id, currentStatus) => {
    setTogglingId(`featured-${id}`);
    try {
      await API.patch(`/products/${id}/toggle-featured`);
      fetchProducts();
      showNotification(
        currentStatus ? "Removed from featured" : "Added to featured",
        "success"
      );
    } catch (error) {
      console.error("Error toggling featured:", error);
      showNotification("Error toggling featured", "error");
    } finally {
      setTogglingId(null);
    }
  };

  // ==================== TOGGLE STOCK ====================
  const handleToggleStock = async (id, currentStatus) => {
    setTogglingId(`stock-${id}`);
    try {
      await API.patch(`/products/${id}/toggle-stock`);
      fetchProducts();
      showNotification(
        currentStatus ? "Out of stock" : "In stock",
        "success"
      );
    } catch (error) {
      console.error("Error toggling stock:", error);
      showNotification("Error toggling stock", "error");
    } finally {
      setTogglingId(null);
    }
  };

  // ==================== EDIT PRODUCT ====================
  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      category: product.category,
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      tags: product.tags ? product.tags.join(", ") : "",
      metaTitle: product.metaTitle || "",
      metaDescription: product.metaDescription || "",
    });
    setVariants(product.variants || []);
    setIsActive(product.isActive);
    setIsFeatured(product.isFeatured);
    setIsInStock(product.isInStock);
    setImages([]);
    setImagePreview(product.images || []);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ==================== RESET FORM ====================
  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      shortDescription: "",
      description: "",
      tags: "",
      metaTitle: "",
      metaDescription: "",
    });
    setImages([]);
    setImagePreview([]);
    setEditingId(null);
    setVariants([]);
    setIsActive(true);
    setIsFeatured(false);
    setIsInStock(true);
    setDeleteConfirm(null);
  };

  // ==================== CLEAR FILTERS ====================
  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setPriceSort("");
  };

  // ==================== HELPER FUNCTIONS ====================
  const getMinPrice = (product) => {
    if (!product.variants || product.variants.length === 0) return 0;
    const prices = product.variants
      .map((v) => Number(v.price))
      .filter((p) => !isNaN(p));
    return prices.length > 0 ? Math.min(...prices) : 0;
  };

  const getMaxPrice = (product) => {
    if (!product.variants || product.variants.length === 0) return 0;
    const prices = product.variants
      .map((v) => Number(v.price))
      .filter((p) => !isNaN(p));
    return prices.length > 0 ? Math.max(...prices) : 0;
  };

  return (
    <div className="admin-module">
      {/* ==================== NOTIFICATION ==================== */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <div className="notification-content">
            {notification.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* ==================== HEADER ==================== */}
      <div className="module-header">
        <div>
          <h2>Products Management</h2>
          <p>Create, edit, and manage your products</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            if (isFormOpen) {
              setIsFormOpen(false);
              resetForm();
            } else {
              resetForm();
              setIsFormOpen(true);
            }
          }}
        >
          {isFormOpen ? <X size={18} /> : <Plus size={18} />}
          {isFormOpen ? "Cancel" : "Add Product"}
        </button>
      </div>

      {/* ==================== FILTER BAR ==================== */}
      <div className="filter-bar">
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm("")}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="filter-controls">
          <div className="filter-select">
            <ChevronDown size={16} />
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
          </div>

          <div className="filter-select">
            <ChevronDown size={16} />
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
            >
              <option value="">Sort by Price</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          {(searchTerm || categoryFilter || priceSort) && (
            <button className="btn-filter-clear" onClick={clearFilters}>
              <Filter size={16} />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* ==================== FORM ==================== */}
      {isFormOpen && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>{editingId ? "Edit Product" : "Create New Product"}</h3>
          </div>

          <div className="form-container">
            {/* Basic Information */}
            <div className="form-section">
              <h4 className="section-title">Basic Information</h4>
              <div className="form-grid">
                <div className="input-group full-width">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
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
                  <label>Short Description</label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="Brief description (max 250 chars)"
                    maxLength={250}
                  />
                  <small>
                    {formData.shortDescription.length}/250
                  </small>
                </div>

                <div className="input-group full-width">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Detailed product description"
                    rows="5"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="form-section">
              <h4 className="section-title">Product Images</h4>
              <div className="input-group full-width">
                <label>Upload Images {!editingId && "*"}</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="image-input"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!editingId}
                  />
                  <label htmlFor="image-input" className="file-label">
                    <Plus size={24} />
                    <span>Click to upload or drag images here</span>
                    <small>JPG, PNG, WebP up to 10MB each</small>
                  </label>
                </div>

                {/* Image Previews */}
                {imagePreview.length > 0 && (
                  <div className="image-preview-grid">
                    {imagePreview.map((preview, idx) => (
                      <div key={idx} className="image-preview-item">
                        <img
                          src={
                            preview.startsWith("http")
                              ? preview
                              : preview
                          }
                          alt={`Preview ${idx + 1}`}
                        />
                        <button
                          type="button"
                          className="remove-image-btn"
                          onClick={() => removeImage(idx)}
                        >
                          <X size={16} />
                        </button>
                        {idx === 0 && (
                          <span className="primary-badge">Primary</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Variants */}
            <div className="form-section">
              <h4 className="section-title">Product Variants *</h4>
              <ProductVariantEditor
                variants={variants}
                setVariants={setVariants}
              />
            </div>

            {/* Tags & Meta */}
            {/* <div className="form-section">
              <h4 className="section-title">Tags & SEO</h4>
              <div className="form-grid">
                <div className="input-group full-width">
                  <label>Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Separate tags with commas (e.g. men, casual, summer)"
                  />
                </div>

                <div className="input-group full-width">
                  <label>Meta Title</label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    placeholder="SEO title for search engines"
                  />
                </div>

                <div className="input-group full-width">
                  <label>Meta Description</label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    placeholder="SEO description for search engines"
                    rows="3"
                  />
                </div>
              </div>
            </div> */}

            {/* Status & Visibility */}
            <div className="form-section">
              <h4 className="section-title">Status & Visibility</h4>
              <div className="status-grid">
                <div className="status-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <span>Active</span>
                  </label>
                  <p>Make this product visible in the store</p>
                </div>

                <div className="status-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isInStock}
                      onChange={(e) => setIsInStock(e.target.checked)}
                    />
                    <span>In Stock</span>
                  </label>
                  <p>Mark product as available for purchase</p>
                </div>

                <div className="status-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                    />
                    <span>Featured</span>
                  </label>
                  <p>Highlight on homepage</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setIsFormOpen(false);
                resetForm();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Clock size={16} />
                  {editingId ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  {editingId ? "Update Product" : "Create Product"}
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* ==================== PRODUCTS LIST ==================== */}
      {fetchLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="products-section">
          <div className="products-header">
            <h3>
              {filteredProducts.length} Product{filteredProducts.length !== 1 ? "s" : ""}
              {(searchTerm || categoryFilter || priceSort) && " (Filtered)"}
            </h3>
          </div>

          <div className="admin-list">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className={`admin-card ${!product.isActive ? "unavailable" : ""}`}
              >
                {/* Card Image */}
                <div className="card-image">
                  <img
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                  />

                  {/* Status Badges */}
                  <div className="card-badges">
                    {product.isFeatured && (
                      <span className="badge badge-featured">⭐ Featured</span>
                    )}
                    <span
                      className={`badge ${
                        product.isActive
                          ? "badge-active"
                          : "badge-inactive"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                    {!product.isInStock && (
                      <span className="badge badge-outofstock">Out of Stock</span>
                    )}
                  </div>

                  {/* Unavailable Overlay */}
                  {!product.isActive && (
                    <div className="card-overlay">
                      <span className="overlay-text">UNAVAILABLE</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <div className="card-title-section">
                    <h3 title={product.name}>{product.name}</h3>
                    <span className="category-badge">
                      {categories.find((c) => c._id === product.category)?.name ||
                        "Uncategorized"}
                    </span>
                  </div>

                  {product.shortDescription && (
                    <p className="card-description">
                      {product.shortDescription}
                    </p>
                  )}

                  {/* Price Range */}
                  <div className="price-section">
                    <span className="price-label">Price Range:</span>
                    <span className="price-value">
                      ₹{getMinPrice(product).toLocaleString()}
                      {getMaxPrice(product) > getMinPrice(product) &&
                        ` - ₹${getMaxPrice(product).toLocaleString()}`}
                    </span>
                  </div>

                  {/* Variants Preview */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="variants-section">
                      <strong className="variants-label">
                        {product.variants.length} Variant{product.variants.length !== 1 ? "s" : ""}
                      </strong>
                      <div className="variants-list">
                        {product.variants.map((v, idx) => (
                          <span key={idx} className="variant-chip">
                            {v.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Images Count */}
                  <div className="meta-info">
                    <span>📸 {product.images?.length || 0} images</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="card-actions">
                    <button
                      className="action-btn action-edit"
                      onClick={() => handleEdit(product)}
                      title="Edit product"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button
                      className="action-btn action-delete"
                      onClick={() => handleDelete(product._id)}
                      title={deleteConfirm === product._id ? "Click again to confirm" : "Delete product"}
                    >
                      <Trash2 size={16} />
                      {deleteConfirm === product._id ? "Confirm?" : "Delete"}
                    </button>
                  </div>

                  {/* Toggle Controls */}
                  <div className="toggle-controls">
                    <button
                      className={`toggle-btn ${
                        product.isActive ? "toggle-active" : "toggle-inactive"
                      }`}
                      onClick={() =>
                        handleToggleAvailability(product._id, product.isActive)
                      }
                      disabled={togglingId === product._id}
                      title={product.isActive ? "Deactivate" : "Activate"}
                    >
                      {togglingId === product._id ? (
                        <>
                          <Clock size={14} />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          {product.isActive ? (
                            <Eye size={14} />
                          ) : (
                            <EyeOff size={14} />
                          )}
                          <span>
                            {product.isActive ? "Active" : "Inactive"}
                          </span>
                        </>
                      )}
                    </button>

                    <button
                      className={`toggle-btn ${
                        product.isInStock ? "toggle-stock" : "toggle-nostock"
                      }`}
                      onClick={() =>
                        handleToggleStock(product._id, product.isInStock)
                      }
                      disabled={togglingId === `stock-${product._id}`}
                      title={product.isInStock ? "Mark as out of stock" : "Mark as in stock"}
                    >
                      {togglingId === `stock-${product._id}` ? (
                        <>
                          <Clock size={14} />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <span>
                            {product.isInStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </>
                      )}
                    </button>

                    <button
                      className={`toggle-btn ${
                        product.isFeatured ? "toggle-featured" : ""
                      }`}
                      onClick={() =>
                        handleToggleFeatured(product._id, product.isFeatured)
                      }
                      disabled={togglingId === `featured-${product._id}`}
                      title={product.isFeatured ? "Remove from featured" : "Add to featured"}
                    >
                      {togglingId === `featured-${product._id}` ? (
                        <>
                          <Clock size={14} />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <span>
                            {product.isFeatured ? "★ Featured" : "☆ Feature"}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <Filter size={48} />
          </div>
          <h3>No Products Found</h3>
          <p>
            {searchTerm || categoryFilter || priceSort
              ? "Try adjusting your filters"
              : "Create your first product to get started"}
          </p>
          {(searchTerm || categoryFilter || priceSort) && (
            <button className="btn-secondary" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AddProduct;
