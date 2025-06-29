import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const MotionNavLink = ({ to, children, exact = false, ...props }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{ display: "inline-block", margin: "0 10px" }}
  >
    <NavLink
      to={to}
      end={exact}
      {...props}
      style={({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "#7ed957" : "#fff",
        fontWeight: isActive ? "bold" : "normal",
        fontSize: "1rem",
        transition: "color 0.2s ease-in-out",
      })}
    >
      {children}
    </NavLink>
  </motion.div>
);

export default MotionNavLink;
