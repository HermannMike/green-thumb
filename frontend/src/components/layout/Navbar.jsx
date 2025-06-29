import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        Green Thumb<span style={{ marginLeft: "5px" }}>🌱</span>
      </div>
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        {!user ? (
          <>
            <NavItem to="/login" label="Login" />
            <NavItem to="/register" label="Register" />
          </>
        ) : (
          <>
            <NavItem to="/plants" label="My Plants" />
            <NavItem to="/reminders" label="Reminders" />
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive ? "nav-link active" : "nav-link"
    }
  >
    {label}
  </NavLink>
);

export default Navbar;

