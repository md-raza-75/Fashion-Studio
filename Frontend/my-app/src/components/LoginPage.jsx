import React from "react";
import "../LoginPage.css";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <header className="navbar">
        <div className="back-button">&#8592;</div>
        <nav>
          <a href="#" className="active">Home</a>
          <a href="#">Kurti</a>
          <a href="#">Gown</a>
          <a href="#">Saree</a>
          <a href="#">Jewellery</a>
        </nav>
        <div className="icons">
          <span className="gear-icon"></span>
          <span className="profile-icon"> Profile👤</span>
        </div>
      </header>

      <div className="login-content">
        <div className="login-form">
          <h1>WELCOME BACK</h1>
          <p>Welcome back! Please enter your details.</p>

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="********" />

          <div className="options">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
            <a href="#">Forgot password</a>
          </div>

          <button className="sign-in">Sign in</button>
          
          {/* Correct Link for Signup Navigation */}
          <p className="signup">
            Don't have an account? <Link to="/signup"><span>Sign up for free!</span></Link>
          </p>
        </div>

        <div className="login-image">
          <img src="/images/model1.jpg" alt="Fashion Illustration" />
        </div>
      </div>
    </div>
  );
}
