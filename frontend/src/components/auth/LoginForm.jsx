import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    navigate("/plants");
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <a onClick={() => navigate("/register")}>Register</a>
      </p>
    </div>
  );
};

export default LoginForm;

