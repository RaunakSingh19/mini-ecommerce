import { useEffect, useState } from "react";
import API from "../services/api";
import "./AddHero.css";

const initialState = {
  title: "",
  subtitle: "",
  description: "",
  buttonText: "",
  buttonLink: "",

  layoutType: "left-image",

  backgroundColor: "#000000",

  titleColor: "#ffffff",
  subtitleColor: "#e2e8f0",
  descriptionColor: "#cbd5e1",

  buttonColor: "#ef4444",
  buttonTextColor: "#ffffff",

  badgeColor: "#ffffff",
  badgeTextColor: "#000000",
};

const AddHero = () => {
  const [heroes, setHeroes] = useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [image, setImage] =
    useState(null);

  const [formData, setFormData] =
    useState(initialState);

  useEffect(() => {
    fetchHeroes();
  }, []);

  const fetchHeroes = async () => {
    try {
      const { data } =
        await API.get("/heroes");

      setHeroes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const heroData =
        new FormData();

      Object.entries(formData).forEach(
        ([key, value]) => {
          heroData.append(
            key,
            value
          );
        }
      );

      if (image) {
        heroData.append(
          "image",
          image
        );
      }

      if (editingId) {
        await API.put(
          `/heroes/${editingId}`,
          heroData
        );

        alert("Hero Updated");
      } else {
        await API.post(
          "/heroes",
          heroData
        );

        alert("Hero Added");
      }

      resetForm();

      fetchHeroes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (
    id
  ) => {
    try {
      await API.delete(
        `/heroes/${id}`
      );

      fetchHeroes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (hero) => {
    setEditingId(hero._id);

    setFormData({
      title: hero.title || "",
      subtitle:
        hero.subtitle || "",
      description:
        hero.description || "",

      buttonText:
        hero.buttonText || "",

      buttonLink:
        hero.buttonLink || "",

      layoutType:
        hero.layoutType ||
        "left-image",

      backgroundColor:
        hero.backgroundColor ||
        "#000000",

      titleColor:
        hero.titleColor ||
        "#ffffff",

      subtitleColor:
        hero.subtitleColor ||
        "#e2e8f0",

      descriptionColor:
        hero.descriptionColor ||
        "#cbd5e1",

      buttonColor:
        hero.buttonColor ||
        "#ef4444",

      buttonTextColor:
        hero.buttonTextColor ||
        "#ffffff",

      badgeColor:
        hero.badgeColor ||
        "#ffffff",

      badgeTextColor:
        hero.badgeTextColor ||
        "#000000",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setImage(null);

    setFormData(initialState);
  };

  return (
    <div className="hero-admin">
      <div className="hero-admin-top">
        <h1>
          Hero Section Manager
        </h1>

        <p>
          Dynamic Ecommerce Hero CMS
        </p>
      </div>

      <form
        className="hero-form"
        onSubmit={handleSubmit}
      >
        <div className="hero-form-grid">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="subtitle"
            placeholder="Subtitle"
            value={formData.subtitle}
            onChange={handleChange}
          />

          <input
            type="text"
            name="buttonText"
            placeholder="Button Text"
            value={
              formData.buttonText
            }
            onChange={handleChange}
          />

          <input
            type="text"
            name="buttonLink"
            placeholder="Button Link"
            value={
              formData.buttonLink
            }
            onChange={handleChange}
          />

          <select
            name="layoutType"
            value={
              formData.layoutType
            }
            onChange={handleChange}
          >
            <option value="left-image">
              Left Image
            </option>

            <option value="right-image">
              Right Image
            </option>

            <option value="center-content">
              Center Background
            </option>

            <option value="image-only">
              Image Only
            </option>
          </select>

          <input
            type="file"
            onChange={(e) =>
              setImage(
                e.target.files[0]
              )
            }
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={
            formData.description
          }
          onChange={handleChange}
        />

        {/* COLORS */}

        <div className="color-grid">
          <div className="color-field">
            <label>
              Background
            </label>

            <input
              type="color"
              name="backgroundColor"
              value={
                formData.backgroundColor
              }
              onChange={handleChange}
            />
          </div>

          <div className="color-field">
            <label>Title</label>

            <input
              type="color"
              name="titleColor"
              value={
                formData.titleColor
              }
              onChange={handleChange}
            />
          </div>

          <div className="color-field">
            <label>
              Subtitle
            </label>

            <input
              type="color"
              name="subtitleColor"
              value={
                formData.subtitleColor
              }
              onChange={handleChange}
            />
          </div>

          <div className="color-field">
            <label>
              Description
            </label>

            <input
              type="color"
              name="descriptionColor"
              value={
                formData.descriptionColor
              }
              onChange={handleChange}
            />
          </div>

          <div className="color-field">
            <label>
              Button BG
            </label>

            <input
              type="color"
              name="buttonColor"
              value={
                formData.buttonColor
              }
              onChange={handleChange}
            />
          </div>

          <div className="color-field">
            <label>
              Button Text
            </label>

            <input
              type="color"
              name="buttonTextColor"
              value={
                formData.buttonTextColor
              }
              onChange={handleChange}
            />
          </div>

          <div className="color-field">
            <label>
              Badge BG
            </label>

            <input
              type="color"
              name="badgeColor"
              value={
                formData.badgeColor
              }
              onChange={handleChange}
            />
          </div>

          <div className="color-field">
            <label>
              Badge Text
            </label>

            <input
              type="color"
              name="badgeTextColor"
              value={
                formData.badgeTextColor
              }
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="hero-btns">
          <button
            type="button"
            className="cancel-btn"
            onClick={resetForm}
          >
            Reset
          </button>

          <button
            type="submit"
            className="save-btn"
          >
            {editingId
              ? "Update Hero"
              : "Add Hero"}
          </button>
        </div>
      </form>

      {/* HERO LIST */}

      <div className="hero-list">
        {heroes.map((hero) => (
          <div
            className="hero-card"
            key={hero._id}
          >
            <img
              src={hero.image}
              alt={hero.title}
            />

            <div className="hero-card-content">
              <h2>
                {hero.title}
              </h2>

              <p>
                {hero.subtitle}
              </p>

              <span>
                {
                  hero.layoutType
                }
              </span>

              <div className="hero-card-btns">
                <button
                  onClick={() =>
                    handleEdit(hero)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      hero._id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddHero;