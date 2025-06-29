import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css"; // Ensure you have the correct path to your CSS file


const videoUrl = "/Homepage.mp4";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <video className="video-bg" autoPlay loop muted playsInline>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay" />
      <div className="homepage-content">
        <div className="welcome-card">
          <h1>
            Welcome to <span className="highlight">Green Thumb</span>
          </h1>
          <p>
            Your personal plant management app. Track your plants, set reminders,
            and grow your garden with ease.
          </p>
          <div className="cta-buttons">
            <button className="btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

