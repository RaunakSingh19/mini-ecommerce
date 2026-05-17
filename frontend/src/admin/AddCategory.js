import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import {
  Edit3,
  Trash2,
  Plus,
  X,
  Search,
} from "lucide-react";

import "./AdminCommon.css";

const AddCategory = () => {

  const [categories, setCategories] =
    useState([]);

  const [filteredCategories,
    setFilteredCategories] =
    useState([]);

  const [editingId,
    setEditingId] =
    useState(null);

  const [isFormOpen,
    setIsFormOpen] =
    useState(false);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [formData,
    setFormData] =
    useState({
      name: "",

      slug: "",

      image: "",
    });



  useEffect(() => {
    fetchCategories();
  }, []);



  useEffect(() => {

    const filtered =
      categories.filter((cat) =>
        cat.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
      );

    setFilteredCategories(
      filtered
    );

  }, [
    searchTerm,
    categories,
  ]);



  const fetchCategories =
    async () => {

      try {

        const { data } =
          await API.get(
            "/categories"
          );

        setCategories(data);

      } catch (error) {
        console.log(error);
      }
    };



  const handleChange = (
    e
  ) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };



  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (editingId) {

          await API.put(
            `/categories/${editingId}`,
            formData
          );

          alert(
            "Category Updated"
          );

        } else {

          await API.post(
            "/categories",
            formData
          );

          alert(
            "Category Added"
          );
        }

        resetForm();

        fetchCategories();

      } catch (error) {
        console.log(error);
      }
    };



  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete category?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/categories/${id}`
        );

        fetchCategories();

      } catch (error) {
        console.log(error);
      }
    };



  const handleEdit = (
    category
  ) => {

    setEditingId(
      category._id
    );

    setFormData({
      name: category.name,

      slug: category.slug,

      image:
        category.image,
    });

    setIsFormOpen(true);
  };



  const resetForm = () => {

    setEditingId(null);

    setFormData({
      name: "",

      slug: "",

      image: "",
    });

    setIsFormOpen(false);
  };



  return (

    <div className="admin-module">

      <div className="module-header">

        <div>
          <h2>
            Categories
          </h2>

          <p>
            Manage your product
            categories
          </p>
        </div>



        <button
          className="btn-primary"
          onClick={() =>
            setIsFormOpen(
              !isFormOpen
            )
          }
        >

          {isFormOpen ? (
            <X size={18} />
          ) : (
            <Plus size={18} />
          )}

          {isFormOpen
            ? "Close"
            : "Add Category"}

        </button>

      </div>



      <div className="search-bar">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

      </div>



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
                Category Name
              </label>

              <input
                type="text"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                placeholder="Enter name"
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
                placeholder="category-slug"
                required
              />

            </div>



            <div className="input-group full-width">

              <label>
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={
                  formData.image
                }
                onChange={
                  handleChange
                }
                placeholder="https://example.com/image.jpg"
              />

            </div>

          </div>



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
            >
              {editingId
                ? "Update Category"
                : "Add Category"}
            </button>

          </div>

        </form>
      )}



      <div className="admin-list">

        {filteredCategories.map(
          (cat) => (

            <div
              className="admin-card"
              key={cat._id}
            >

              <div className="card-image">

                <img
                  src={cat.image}
                  alt={cat.name}
                />

              </div>



              <div className="card-body">

                <h3>
                  {cat.name}
                </h3>

                <span className="category-tag">
                  /{cat.slug}
                </span>



                <div className="admin-actions">

                  <button
                    className="icon-btn edit"
                    onClick={() =>
                      handleEdit(
                        cat
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
                        cat._id
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

    </div>
  );
};

export default AddCategory;