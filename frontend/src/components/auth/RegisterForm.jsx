import React, { useState, useEffect } from "react";
import { register as registerAPI } from "../../services/auth";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthForm.css";

const RegisterForm = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAvailability = async () => {
      if (form.username.trim() === "") {
        setUsernameAvailable(null);
        setUsernameError("");
        return;
      }
      setCheckingUsername(true);
      try {
        console.log("Checking username availability for:", form.username);
        const response = await api.get('/auth/check_username', { params: { username: form.username } });
        console.log("Response from check_username:", response);
        const data = response.data;
        setUsernameAvailable(data.available);
        setUsernameError(data.available ? "" : data.message);
      } catch (error) {
        console.error("Error in checkAvailability:", error);
        setUsernameAvailable(null);
        setUsernameError("Error checking username availability");
      } finally {
        setCheckingUsername(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      checkAvailability();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [form.username]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameAvailable === false) {
      alert("Username is already taken. Please choose a different username.");
      return;
    }
    try {
      await registerAPI(form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
        {checkingUsername && <p>Checking username availability...</p>}
        {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
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
        <button type="submit" disabled={checkingUsername || usernameAvailable === false}>
          Join
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <a onClick={() => navigate("/login")}>Login</a>
      </p>
    </div>
  );
};

export default RegisterForm;

