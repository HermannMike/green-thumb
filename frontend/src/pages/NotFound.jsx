import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate("/")} style={styles.button}>
        Go Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "15vh",
    padding: "20px",
  },
  header: {
    fontSize: "72px",
    color: "#22c55e",
  },
  message: {
    fontSize: "18px",
    marginBottom: "20px",
    color: "#555",
  },
  button: {
    backgroundColor: "#22c55e",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default NotFound;

