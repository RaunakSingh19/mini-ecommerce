// import "./Navbar.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <h2>FoodieHub</h2>

//       <ul className="nav-links">
//         <li>Home</li>
//         <li>Menu</li>
//         <li>About</li>
//         <li>Contact</li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <h2>Foodie<span>Hub</span></h2>
      </div>

      {/* Hamburger Menu Icon */}
      <div className={`nav-toggle ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><a href="#home">Home</a></li>
        <li><a href="menu">Menu</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact" className="nav-btn">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;