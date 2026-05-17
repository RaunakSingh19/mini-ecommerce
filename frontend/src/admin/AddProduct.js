import {
  useEffect,
  useState,
  useCallback,
} from "react";

import API from "../services/api";

import {
  Search,
  Edit3,
  Trash2,
  Plus,
  X,
  Filter,
} from "lucide-react";

const AddProduct = () => {
  const [products, setProducts] =
    useState([]);

  const [
    filteredProducts,
    setFilteredProducts,
  ] = useState([]);

  const [categories, setCategories] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // image files
  const [images, setImages] =
    useState([]);

  // filters
  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    categoryFilter,
    setCategoryFilter,
  ] = useState("");

  const [priceSort, setPriceSort] =
    useState("");

  const [formData, setFormData] =
    useState({
      title: "",

      slug: "",

      description: "",

      shortDescription: "",

      price: "",

      stock: "",

      category: "",
    });



  // FETCH PRODUCTS
  const fetchProducts =
    useCallback(async () => {
      try {
        const { data } =
          await API.get("/products");

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }, []);



  // FETCH CATEGORIES
  const fetchCategories =
    useCallback(async () => {
      try {
        const { data } =
          await API.get(
            "/categories"
          );

        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }, []);



  useEffect(() => {
    fetchProducts();

    fetchCategories();
  }, [
    fetchProducts,
    fetchCategories,
  ]);



  // FILTER PRODUCTS
  useEffect(() => {
    let results = [...products];



    // search
    if (searchTerm) {
      results = results.filter(
        (product) =>
          product.title
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||
          product.slug
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
      );
    }



    // category filter
    if (categoryFilter) {
      results = results.filter(
        (product) =>
          product.category?._id ===
          categoryFilter
      );
    }



    // sorting
    if (priceSort === "asc") {
      results.sort(
        (a, b) => a.price - b.price
      );
    }

    if (priceSort === "desc") {
      results.sort(
        (a, b) => b.price - a.price
      );
    }

    setFilteredProducts(results);
  }, [
    searchTerm,
    categoryFilter,
    priceSort,
    products,
  ]);



  // HANDLE TEXT INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };



  // HANDLE IMAGE INPUT
  const handleImageChange = (
    e
  ) => {
    setImages([
      ...e.target.files,
    ]);
  };



  // SUBMIT FORM
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const productData =
        new FormData();



      productData.append(
        "title",
        formData.title
      );

      productData.append(
        "slug",
        formData.slug
      );

      productData.append(
        "description",
        formData.description
      );

      productData.append(
        "shortDescription",
        formData.shortDescription
      );

      productData.append(
        "price",
        formData.price
      );

      productData.append(
        "stock",
        formData.stock
      );

      productData.append(
        "category",
        formData.category
      );



      // multiple images
      images.forEach((img) => {
        productData.append(
          "images",
          img
        );
      });



      if (editingId) {
        await API.put(
          `/products/${editingId}`,
          productData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Product Updated Successfully"
        );
      } else {
        await API.post(
          "/products",
          productData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Product Added Successfully"
        );
      }

      resetForm();

      fetchProducts();
    } catch (error) {
      console.error(error);

      alert(
        "Error saving product"
      );
    } finally {
      setLoading(false);
    }
  };



  // DELETE PRODUCT
  const handleDelete = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/products/${id}`
      );

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };



  // EDIT PRODUCT
  const handleEdit = (
    product
  ) => {
    setEditingId(product._id);

    setFormData({
      title: product.title,

      slug: product.slug,

      description:
        product.description,

      shortDescription:
        product.shortDescription,

      price: product.price,

      stock: product.stock,

      category:
        product.category?._id ||
        "",
    });

    setIsFormOpen(true);

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };



  // RESET FORM
  const resetForm = () => {
    setFormData({
      title: "",

      slug: "",

      description: "",

      shortDescription: "",

      price: "",

      stock: "",

      category: "",
    });

    setImages([]);

    setEditingId(null);

    setIsFormOpen(false);
  };



  // CLEAR FILTERS
  const clearFilters = () => {
    setSearchTerm("");

    setCategoryFilter("");

    setPriceSort("");
  };



  return (
    <div className="admin-module">

      {/* HEADER */}
      <div className="module-header">
        <div>
          <h2>
            Products
          </h2>

          <p>
            Manage your products
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            resetForm();

            setIsFormOpen(
              !isFormOpen
            );
          }}
        >
          {isFormOpen ? (
            <X size={18} />
          ) : (
            <Plus size={18} />
          )}

          {isFormOpen
            ? "Close"
            : "Add Product"}
        </button>
      </div>



      {/* FILTER BAR */}
      <div className="filter-bar">

        {/* SEARCH */}
        <div className="search-bar">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
          />
        </div>



        {/* FILTERS */}
        <div className="filter-controls">

          {/* CATEGORY */}
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value
              )
            }
          >
            <option value="">
              All Categories
            </option>

            {categories.map(
              (cat) => (
                <option
                  key={cat._id}
                  value={cat._id}
                >
                  {cat.name}
                </option>
              )
            )}
          </select>



          {/* PRICE */}
          <select
            value={priceSort}
            onChange={(e) =>
              setPriceSort(
                e.target.value
              )
            }
          >
            <option value="">
              Sort By Price
            </option>

            <option value="asc">
              Low To High
            </option>

            <option value="desc">
              High To Low
            </option>
          </select>



          {(searchTerm ||
            categoryFilter ||
            priceSort) && (
              <button
                className="btn-text"
                onClick={
                  clearFilters
                }
              >
                Clear
              </button>
            )}
        </div>
      </div>



      {/* FORM */}
      {isFormOpen && (
        <form
          className="admin-form"
          onSubmit={
            handleSubmit
          }
        >

          <div className="form-grid">

            <div className="input-group">
              <label>
                Title
              </label>

              <input
                type="text"
                name="title"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>



            <div className="input-group">
              <label>
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={
                  formData.slug
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>



            <div className="input-group full-width">
              <label>
                Description
              </label>

              <textarea
                rows="4"
                name="description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
              />
            </div>



            <div className="input-group">
              <label>
                Short Description
              </label>

              <input
                type="text"
                name="shortDescription"
                value={
                  formData.shortDescription
                }
                onChange={
                  handleChange
                }
              />
            </div>



            <div className="input-group">
              <label>
                Price
              </label>

              <input
                type="number"
                name="price"
                value={
                  formData.price
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>



            <div className="input-group">
              <label>
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={
                  formData.stock
                }
                onChange={
                  handleChange
                }
              />
            </div>



            <div className="input-group">
              <label>
                Category
              </label>

              <select
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
              >
                <option value="">
                  Select Category
                </option>

                {categories.map(
                  (cat) => (
                    <option
                      key={cat._id}
                      value={cat._id}
                    >
                      {cat.name}
                    </option>
                  ) 
                )}
              </select>
            </div>



            {/* IMAGE INPUT */}
            <div className="input-group">
              <label>
                Product Images
              </label>

              <input
                type="file"
                multiple
                onChange={
                  handleImageChange
                }
              />
            </div>

          </div>



          {/* ACTIONS */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={
                resetForm
              }
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



      {/* PRODUCTS */}
      {filteredProducts.length >
        0 ? (

        <div className="admin-list">

          {filteredProducts.map(
            (product) => (

              <div
                className="admin-card"
                key={product._id}
              >

                <div className="card-image">

                  <img
                    src={
                      product
                        .images?.[0]
                    }
                    alt={
                      product.title
                    }
                  />

                  <span className="stock-badge">
                    {product.stock >
                      0
                      ? "In Stock"
                      : "Out Of Stock"}
                  </span>

                </div>



                <div className="card-body">

                  <h3>
                    {
                      product.title
                    }
                  </h3>

                  <span className="category-tag">
                    {
                      product
                        .category
                        ?.name
                    }
                  </span>

                  <p className="price">
                    ₹{" "}
                    {
                      product.price
                    }
                  </p>



                  <div className="admin-actions">

                    <button
                      className="icon-btn edit"
                      onClick={() =>
                        handleEdit(
                          product
                        )
                      }
                    >
                      <Edit3
                        size={16}
                      />

                      Edit
                    </button>



                    <button
                      className="icon-btn delete"
                      onClick={() =>
                        handleDelete(
                          product._id
                        )
                      }
                    >
                      <Trash2
                        size={16}
                      />

                      Delete
                    </button>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      ) : (

        <div className="empty-state">

          <Filter size={40} />

          <p>
            No Products Found
          </p>

          <button
            className="btn-secondary"
            onClick={clearFilters}
          >
            Reset Filters
          </button>

        </div>
      )}

    </div>
  );
};

export default AddProduct;