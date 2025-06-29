import React, { useState } from "react";
import { register as registerAPI } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthForm.css";

const RegisterForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerAPI(form);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter a secure password"
          required
        />
        <button type="submit">Join</button>
      </form>
      <p>
        Already have an account?{" "}
        <a onClick={() => navigate("/login")}>Login</a>
      </p>
    </div>
  );
};

export default RegisterForm;

