import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";
// import About from "../pages/About";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Gallery", path: "/gallery" },
  { label: "About", path: "/about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    document.body.style.overflow = open
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`lux-navbar ${
          scrolled
            ? "lux-navbar-scroll"
            : ""
        }`}
      >
        <Link
          to="/"
          className="lux-logo"
        >
          <img
            src={logo}
            alt="Cafe Mosaic"
          />
        </Link>

        <nav className="lux-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="lux-btn"
        >
          Reserve Table
        </Link>

        <button
          className={`lux-toggle ${
            open ? "active" : ""
          }`}
          onClick={() =>
            setOpen(!open)
          }
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div
        className={`lux-mobile ${
          open ? "show" : ""
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() =>
              setOpen(false)
            }
          >
            {item.label}
          </Link>
        ))}

        <Link
          to="/contact"
          className="mobile-btn"
          onClick={() =>
            setOpen(false)
          }
        >
          Reserve Table
        </Link>
      </div>
    </>
  );
};

export default Navbar;