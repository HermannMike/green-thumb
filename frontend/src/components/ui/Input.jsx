const Input = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div style={{ marginBottom: "1rem" }}>
    {label && (
      <label htmlFor={name} style={{ display: "block", marginBottom: "5px" }}>
        {label}
      </label>
    )}
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      style={{
        width: "100%",
        padding: "0.75rem",
        borderRadius: "5px",
        border: "1px solid #ccc",
      }}
    />
  </div>
);

export default Input;
