const Alert = ({ message, type = "info" }) => {
  const colors = {
    success: "#4caf50",
    error: "#f44336",
    info: "#2196f3",
    warning: "#ff9800",
  };

  return (
    <div
      style={{
        backgroundColor: `${colors[type]}22`,
        border: `1px solid ${colors[type]}`,
        padding: "10px 15px",
        borderRadius: "6px",
        marginBottom: "1rem",
        color: colors[type],
      }}
    >
      <strong>{type.toUpperCase()}: </strong> {message}
    </div>
  );
};

export default Alert;
