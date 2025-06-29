const Button = ({ children, ...props }) => (
  <button
    {...props}
    style={{
      backgroundColor: "#22c55e",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "10px 16px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease-in-out",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#16a34a")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#22c55e")}
  >
    {children}
  </button>
);

export default Button;
